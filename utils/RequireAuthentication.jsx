import React from 'react'

const RequireAuthentication = (WrappedComponent) => {

    return class extends React.Component {

        static getInitialProps(ctx) {

            const isAuthenticated = ctx.req.user;

            // Use !isAuthenticated for error cases
            if (isAuthenticated?.user) {
                return WrappedComponent.getInitialProps(ctx);
            } else {
                ctx.res.redirect('/')
            }
        }

        render() {
            return <WrappedComponent {...this.props} />;
        }
    };
};

export default RequireAuthentication;