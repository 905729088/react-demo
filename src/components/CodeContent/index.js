import asyncComponent from "../ACommon/async-component";

export default asyncComponent(() =>
    import(/* webpackChunkName: "page-code-content" */'./CodeContent.jsx'))
