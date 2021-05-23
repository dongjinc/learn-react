import React from 'react'
class ErrorBoundary extends React.Component<{}, {hasError: boolean}>{
    constructor(props){
        super(props);
        this.state = {
            hasError: false
        }
    }
    static getDerivedStateFromError(error){
        // 更新state使下一次渲染能够显示降级后的UI
        return { hasError: true }
    }
    componentDidCatch(error, errorInfo){
        // 上报给服务器
        console.log(error, errorInfo)
        // logErrorToMyService(error, errorInfo)
    }
    render(){
        if(this.state.hasError){
            return <h1>Something went wrong.</h1>
        }
        return this.props.children
    }
}
export default ErrorBoundary