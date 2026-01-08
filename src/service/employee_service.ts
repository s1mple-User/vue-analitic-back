import type { AuthRequest } from "../interface/types.js";
import { Company } from "../models/company.js";
import { User } from "../models/user.js";

export async function employeeAdd_service(req: AuthRequest) {
    try {
   
        const { email, name, role, salary, efficiency,companyName} = req.body;

        if ( !name || !email) {
            return { status: 400, message: "Не удалось добавить работника: недостаточно данных" };
        }
        const companyData = await Company.findOne({ title: companyName });

        const employeer =await User.findOne({ email }) 

        if (!employeer) {
            return { status: 404, message: "Пользователь с таким email не зарегистрирован" };
        }

    //     const isAlreadyEmployee = companyData?.employees.some(
    //    (emp: any) => emp.user.toString() === employeer._id.toString()
    //    );

    //    if (isAlreadyEmployee) {
    //      return { status: 400, message: "Этот пользователь уже является сотрудником данной компании" };
    //         }

        const updatedCompany = await Company.findOneAndUpdate(
            { _id: companyData?._id },
            { 
              $push: { 
                    employees: { 
                        user: employeer._id, 
                        name:name, 
                        role, 
                        salary: salary || 0, 
                        efficiency: efficiency || 0 
                    } 
                }
            },
            { new: true, runValidators: true } 
        ).populate("employees.user", "name email");

        

        if (!updatedCompany) {
            return { status: 404, message: "Компания не найдена" };
        }

        return { 
            status: 200, 
            message: "Сотрудник успешно добавлен", 
            data: updatedCompany?.employees
        };

    } catch (error) {
        console.error("Ошибка при добавлении сотрудника:", error);
        return { status: 500, message: "Ошибка сервера" };
    }
}

export async function employeeDelete_service(req: AuthRequest) {
    try {
     
        const { company, email } = req.body; 

        if (!email || !company) {
            return { status: 400, message: "Не указаны email сотрудника или название компании" };
        }

    
        const companyData = await Company.findOne({ title: company });
        
        if (!companyData) {
            return { status: 404, message: "Компания не найдена" };
        }

        const userData = await User.findOne({ email });
        if (!userData) {
            return { status: 404, message: "Пользователь с таким email не найден" };
        }

        const updatedCompany = await Company.findByIdAndUpdate(
            companyData._id,
            { 
                $pull: { employees: { user: userData._id } } 
            },
            { new: true } 
        ).populate("employees.user", "name email"); 

        return { 
            status: 200, 
            message: `Сотрудник ${userData.name} успешно удален`, 
            data: updatedCompany?.employees || [] 
        };

    } catch (error) {
        console.error(error);
        return { status: 500, message: "Ошибка сервера при удалении" };
    }
}