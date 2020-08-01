export const required = (value) => {
    if (!value) {
        return "this field is required";
    } else return undefined;
};

export const minLength = (value) => {
    if (value !== undefined) {
        const splitedValue = value.split("");
        if (splitedValue.length < 8) {
            return "not enought length";
        }
    } else return undefined;
};
export const maxLength = (value) => {
    if (value !== undefined) {
        const splitedValue = value.split("");
        if (splitedValue.length > 300) {
            return "too long";
        }
    } else return undefined;
};
export const includesNumbers = (value) => {
    if (value !== undefined) {
        const splitedValue = value.split("");
        if (
            splitedValue.some(
                (item) =>
                    item === "1" ||
                    item === "3" ||
                    item === "4" ||
                    item === "5" ||
                    item === "6" ||
                    item === "7" ||
                    item === "8" ||
                    item === "9" ||
                    item === "0" ||
                    item === "2"
            )
        ) {
            return undefined;
        } else return "password should includes at least one number";
    } else return undefined;
};
