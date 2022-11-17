const setResources = (model: object, hideElemens: object | null = null, actions: object | null = null) => {
    return {
        resource: model,
        options: {
            properties: {
                ...hideElemens,
                createdAt: {
                    isVisible: {
                        list: false, edit: false, create: false, show: true
                    }                
                },
                updatedAt: {
                    isVisible: {
                        list: false, edit: false, create: false, show: true
                    },
                }
            },
            actions: actions
        },
    }
};

export default setResources;