export interface PasswordStrength {
    score: number;
    feedback: string[];
    isValid: boolean;
}
const validatePasswordStrength = (password: string): PasswordStrength => {
    const feedback: string[] = [];
    let score = 0;

    if (password.length >= 8) {
        score += 1;
    } else {
        feedback.push("At least 8 characters");
    }

    if (/[A-Z]/.test(password)) {
        score += 1;
    } else {
        feedback.push("One uppercase letter");
    }

    if (/[a-z]/.test(password)) {
        score += 1;
    } else {
        feedback.push("One lowercase letter");
    }

    if (/\d/.test(password)) {
        score += 1;
    } else {
        feedback.push("One number");
    }

    if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
        score += 1;
    } else {
        feedback.push("One special character");
    }

    return {
        score,
        feedback,
        isValid: score >= 4,
    };
};
export default validatePasswordStrength;