// Service Interface
export interface IAuthService {
    register(registerRequestDto: any): Promise<any>;
    signIn(signInRequestDto: any): Promise<any>;
    changeUserRole(userId: string, newRole: string): Promise<any>;
    logout(userId: string): Promise<void>;
    changePassword(userId: string, newPassword: string): Promise<void>;
}