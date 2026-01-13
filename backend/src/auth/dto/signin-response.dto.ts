export class SignInResponseDto {
    success: boolean;
    accessToken?: string;
    data: {
        userId: string;
        email: string;
        role: 'USER' | 'ADMIN';
    }
}