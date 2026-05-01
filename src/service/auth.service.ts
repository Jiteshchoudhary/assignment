import { AppDataSource } from "../config/database";
import { LoginUserDto } from "../dtos/Login.dto";
import { SignupDto } from "../dtos/Signup.dto";
import { generateToken } from "../helper/generateToken";
import { UserRepository } from "../repository/user.repository";


export class AuthService {
    private userRepository = new UserRepository();

    /**
     * Use this method to create a new user here
     * @param params SignupDto
     * @returns new User 
     */
    async signupUser(params: SignupDto) {

        return await AppDataSource.manager.transaction(async (transactionEntity) => {
            try {
                const isUserExits = await this.userRepository.findOne({
                    where: {
                        email: params.email
                    }
                });
                if (isUserExits) {
                    return Promise.reject({
                        status: 400,
                        message: 'Email Already exits'
                    })
                }
                const newUser = this.userRepository.create(params);
                await transactionEntity.save(newUser);
                return newUser;
            } catch (error) {
                throw error;
            }
        });
    }

    /**
     * Use this method for login
     * @param params LoginUserDto
     * @returns Jwt token string 
     */
    async login(params: LoginUserDto) {
        try {
            const isUserExits = await this.userRepository.findOne({
                where: {
                    email: params.email
                }
            });
            if (!isUserExits) {
                return Promise.reject({
                    status: 404,
                    message: 'Email not found'
                });
            }
            if (isUserExits && isUserExits.tenantId !== params.tenantId) {
                return Promise.reject({
                    status: 404,
                    message: 'Invalid tenantId'
                });
            }
            return await generateToken({ user_id: isUserExits.id, email: isUserExits.email, tenantId: isUserExits.tenantId });
        } catch (error) {
            throw error;
        }
    }
}