# React

[Tutorial: Create a Node.js and React app in Visual Studio](https://docs.microsoft.com/en-us/visualstudio/javascript/tutorial-nodejs-with-react-and-jsx?view=vs-2019)
Before you begin, here's a quick FAQ to introduce you to some key concepts:

- **What is Node.js?**

    Node.js is a server-side JavaScript runtime environment that executes JavaScript code.

- **What is npm?**

    The default package manager for Node.js is npm. A package manager makes it easier to publish and share Node.js source code libraries. The npm package manager simplifies library installation, updating, and uninstallation.

- **What is React?**

    React is a front-end framework for creating a user interface (UI).

- **What is JSX?**

    JSX is a JavaScript syntax extension typically used with React to describe UI elements. You must transpile JSX code to plain JavaScript before it can run in a browser.

- **What is webpack?**

    Webpack bundles JavaScript files so they can run in a browser, and can also transform or package other resources and assets. Webpack can specify a compiler, such as Babel or TypeScript, to transpile JSX or TypeScript code to plain JavaScript.


#### Updating nodejs
1. Install Chocolatey on Windows following the installation [instructions](https://chocolatey.org/install)
2. Start Powershell as Admin. Get installed packages: `choco list --localonly `
3. Uninstall NodeJS, if installed: `Search -> programs -> search for NodeJS -> right-click (if found) �> uninstall`
4. Install LTS (Long Term Support) release of Node.js
  - `choco install nodejs-lts`

    `choco install -y --force nodejs` (installation of regular day release is not recomended)
  - `node -v`<br>

<!--
choco list --localonly 

Chocolatey v0.9.9.2                                      
adobereader 11.0.10                                      
ccleaner 5.03.5128                                       
chocolatey 0.9.9.2                                       
ConEmu 14.9.23.0                                         
gimp 2.8.14.1                                            
git 1.9.5.20150114

c:\ProgramData\chocolatey\lib\nodejs.install\tools\node-v17.1.0-x86.msi 

-->
#### Updating npm
- `npm install npm@latest -g`
  - `npm -v`<br>
##### NPM commands
- `npm install -g <package-name>` (install a module globally)
- `npm root -g` (directory location of the global module installation)
- `npm list -g` (to check which packages are installed globally)
- `npm audit fix --force` (fix npm modules)

### Create a new React application. 

And then go to the directory you want your projects directory to be inside of.
- `npx create-react-app my-blog --use-npm`

#### Run react application
- `cd my-blog`
- `npm start`

    if there is an error: [Node 17.0.1 causes some error - digital envelope routines::unsupported](https://stackoverflow.com/questions/69665222/node-17-0-1-causes-some-error-digital-envelope-routinesunsupported)

    Add these scripts in package.json file:

    ```json
    "scripts": {
        "start": "react-scripts --openssl-legacy-provider start",
        "build": "react-scripts --openssl-legacy-provider build",
        }
    ```
#### Application structure
There are three top level sub-folders:

- **/node_modules** : Where all of the external libraries used to piece together the React app are located. You shouldn�t modify any of the code inside this folder as that would be modifying a third party library, and your changes would be overwritten the next time you run the npm install command.
- **/public** : Assets that aren�t compiled or dynamically generated are stored here. These can be static assets like logos or the robots.txt file.
- **/src** : Where we�ll be spending most of our time. The src, or source folder contains all of our React components, external CSS files, and dynamic assets that we�ll bring into our component files.

- **public\index.html** file, which is html entry point for the app
- **public\manifest.json** file, which is used with mobile phones. 
- **src\App.js** component, which is the root component for our blog, as well as the css and tests that go with it. 

#### Create
- **src\components\Home.js**


Use [<React.Fragment>](https://reactjs.org/docs/fragments.html)

A common pattern in React is for a component to return multiple elements. Fragments let you group a list of children without adding extra nodes to the DOM.

```jsx
render() {
  return (
    <React.Fragment>
      <ChildA />
      <ChildB />
      <ChildC />
    </React.Fragment>
  );
}
```
Use [Short Syntax](https://reactjs.org/docs/fragments.html#short-syntax)
There is a new, shorter syntax you can use for declaring fragments. It looks like empty tags:


```jsx
class Columns extends React.Component {
  render() {
    return (
      <>
        <td>Hello</td>
        <td>World</td>
      </>
    );
  }
}
```
#### Layout.js

```jsx
import React, { Component } from 'react';
import { Container } from 'reactstrap';
import { NavMenu } from './NavMenu';

export class Layout extends Component {
    static displayName = Layout.name;

    render() {
        return (
            <>
                <NavMenu />
                <Container>
                    {this.props.children}
                </Container>
            </>
        );
    }
}
```

reactstrap Container:

```js
  var Container = function Container(props) {
    var className = props.className,
        cssModule = props.cssModule,
        fluid = props.fluid,
        Tag = props.tag,
        attributes = _objectWithoutPropertiesLoose(props, ["className", "cssModule", "fluid", "tag"]);

    var containerClass = 'container';

    if (fluid === true) {
      containerClass = 'container-fluid';
    } else if (fluid) {
      containerClass = "container-" + fluid;
    }

    var classes = mapToCssModules(classnames(className, containerClass), cssModule);
    return React__default.createElement(Tag, _extends({}, attributes, {
      className: classes
    }));
  }; 
```
#### Route, Switch

Article: [React-Router: No Not Found Route?](https://stackoverflow.com/questions/32128978/react-router-no-not-found-route)

For react-router 4 and 5 keep the path

`<Route exact: bool/>`
When true, the active class/style will only be applied if the location is matched exactly.
```jsx
import { Route, Switch } from 'react-router';
export default class App extends Component {
    static displayName = App.name;

    render() {
        return (
            <Layout>
                <Switch>
                    <Route path='/' component={Home} exact />
                    <Route path='/counter' component={Counter} />
                    <Route path='/fetch-data' component={FetchData} />
                    <Route component={NotFoundPage} />
                </Switch>
            </Layout>
        );
    }
}
```
OR [react-router vs react-router-dom, when to use one or the other?](https://stackoverflow.com/questions/42684809/react-router-vs-react-router-dom-when-to-use-one-or-the-other)
<!--https://github.com/ReactTraining-->
[BrowserRouter](https://v5.reactrouter.com/web/api/BrowserRouter)
<!--https://github.com/remix-run/react-router/blob/main/docs/getting-started/installation.md-->
```jsx
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';
export default class App extends Component {
    static displayName = App.name;

    render() {
        return (
            <Router>
                <Layout>
                    <Switch>
                        <Route path='/' component={Home} exact />
                        <Route path='/counter' component={Counter} />
                        <Route path='/fetch-data' component={FetchData} />
                        <Route component={NotFoundPage} />
                    </Switch>
                </Layout>
            </Router>
        );
    }
}
```

**The route order is important!**

#### Route:Parameters
[](https://v5.reactrouter.com/web/api/match)

```jsx
import PropTypes from "prop-types";
export class Article extends Component {
    static displayName = Article.name;
    static propTypes = {
        match: PropTypes.object.isRequired,
        location: PropTypes.object.isRequired,
        history: PropTypes.object.isRequired
    };

    render() {
        const { match, location, history } = this.props;
        console.log(match, location, history)
        return (
            <>
                <h1>This is an article: {match.params.name}</h1>
           </>
        );
    }
}
```

#### setState in Class Components
[Understanding Functional Components vs. Class Components in React](https://www.twilio.com/blog/react-choose-functional-components)

[React functional components: const vs. function](https://dev.to/ugglr/react-functional-components-const-vs-function-2kj9)

Type definitions for React 17.0
```js
// We MUST keep setState() as a unified signature because it allows proper checking of the method return type.
// See: https://github.com/DefinitelyTyped/DefinitelyTyped/issues/18365#issuecomment-351013257
// Also, the ` | S` allows intellisense to not be dumbisense
setState<K extends keyof S>(
    state: ((prevState: Readonly<S>, props: Readonly<P>) => (Pick<S, K> | S | null)) | (Pick<S, K> | S | null),
    callback?: () => void
): void;
```
Usage:
```jsx
export class Article extends Component {
    static displayName = Article.name;
    constructor(props) {
        super(props);
        this.state = { upvotes: 0, comments: [] };
    }
    render() {
        const name = this.props.match.params.name;
        const article = articleContent.find(x => x.name === name);
        if (!article) return <NotFoundPage />
        const otherArticles = articleContent.filter(x => x.name !== name);
        return (
            <>
                <div>
                    <h1>{article.title}</h1>
                    <div>This post has been upvoted {this.state.upvotes} times  
                        <b className="btn btn-outline-primary btn-sm p-0" onClick={() => this.setState({ upvotes: this.state.upvotes + 1 })}>up vote</b>
                    </div>
                    {article.content.map((paragraph, key) => (
                        <p key={key}>{paragraph}</p>
                    ))}
                </div>
                <div>
                    <h2>Other articles</h2>
                    <Articles articles={otherArticles}></Articles>
                </div>
            </>
        );
    }
}
```