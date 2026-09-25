import { createContext, useContext, useReducer } from "react";

const AuthContext = createContext(null);

const STORAGE_KEY = "prettypin_auth_user";

const initialState = {
    isLoggedIn: false,
    user: null, // { fullName, phone }
};

function authReducer(state, action) {
    switch (action.type) {
        case "LOGIN":
            return { isLoggedIn: true, user: action.payload };
        case "LOGOUT":
            return { isLoggedIn: false, user: null };
        default:
            return state;
    }
}

// این تابع فقط یک‌بار، پیش از اولین رندر AuthProvider اجرا می‌شود
// و state واقعی را از localStorage می‌خواند تا هنگام رفرش صفحه،
// وضعیت لاگین بدون هیچ فلیکری بازیابی شود.
function initAuthState() {
    const savedUser = localStorage.getItem(STORAGE_KEY);
    if (savedUser) {
        return { isLoggedIn: true, user: JSON.parse(savedUser) };
    }
    return initialState;
}

export function AuthProvider({ children }) {
    const [state, dispatch] = useReducer(authReducer, initialState, initAuthState);

    const login = (userData) => {
        // TODO: بعد از اتصال API واقعی، این‌جا Token دریافتی از سرور ذخیره می‌شود
        localStorage.setItem(STORAGE_KEY, JSON.stringify(userData));
        dispatch({ type: "LOGIN", payload: userData });
    };

    const logout = () => {
        localStorage.removeItem(STORAGE_KEY);
        dispatch({ type: "LOGOUT" });
    };

    return (
        <AuthContext.Provider value={{ ...state, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

// Custom Hook - به‌جای اینکه هرجا useContext(AuthContext) بنویسیم
export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth باید داخل AuthProvider استفاده شود");
    }
    return context;
}