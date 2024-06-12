// 请求响应参数（不包含data）
export interface Result {
    code: string;
    msg: string;
}

// 请求响应参数（包含data）
export interface ResultData<T = any> extends Result {
    data: T;
}

export namespace Login {
    export interface ReqLoginForm {
        username: string;
        password: string;
    }

    export interface ResLogin {
        token: string;
    }

    export interface ResAuthButtons {
        [key: string]: string[];
    }

    export interface ResUserInfo {
        name: string;
        email: string;
        phone: string;
        avatar: string;
        description: string;
    }
}
