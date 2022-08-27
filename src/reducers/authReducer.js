const authReducer = (state, action) => {
    const {
        type,
        payload: { isAuthenticated, user },
    } = action;

    switch (type) {
        case 'SET_AUTH':
            return {
                ...state,
                authLoading: false,
                isAuthenticated,
                user,
            };
        default:
            throw new Error('Invalid type');
    }
};

export default authReducer;
