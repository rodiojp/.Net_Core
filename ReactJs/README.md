# React

[Tutorial: Create a Node.js and React app in Visual Studio](https://docs.microsoft.com/en-us/visualstudio/javascript/tutorial-nodejs-with-react-and-jsx?view=vs-2019)

Before you begin, here's a quick FAQ to introduce you to some key concepts:

- **What is Node.js?**

    Node.js is a server-side JavaScript runtime environment that executes JavaScript code.

- **What is NPM?**

    The default package manager for Node.js is npm. A package manager makes it easier to publish and share Node.js source code libraries. The npm package manager simplifies library installation, updating, and uninstallation.
    It is a Node.js package manager. Used to install, update, and manages package dependencies.
    - `npm install some-package`
    - `npm run some-package`

- **What is NPX**
    
    It is a Node.js package executer. It is used to execute Node.js packages binaries.
    - `npx some-package`
    - `npx create-react-app my-app`

- **What is React?**

    React is a front-end framework for creating a user interface (UI).

- **What is JSX?**

    JSX is a JavaScript syntax extension typically used with React to describe UI elements. You must transpile JSX code to plain JavaScript before it can run in a browser.

- **What is webpack?**

    Webpack bundles JavaScript files so they can run in a browser, and can also transform or package other resources and assets. Webpack can specify a compiler, such as Babel or TypeScript, to transpile JSX or TypeScript code to plain JavaScript.



#### Updating nodejs

1. Install Chocolatey on Windows following the installation [instructions](https://chocolatey.org/install)
2. Start Powershell as Admin. Get installed packages: `choco list --localonly `
3. Uninstall NodeJS, if installed: `Search -> programs -> search for NodeJS -> right-click (if found) –> uninstall`
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
  - `npm -v`

##### NPM commands
- `npm install -g <package-name>` (install a module globally)
- `npm root -g` (directory location of the global module installation)
- `npm list -g` (to check which packages are installed globally)
- `npm audit fix --force` (fix npm modules)

### Create a new React application. 

And then go to the directory you want your projects directory to be inside of.
- `npx create-react-app my-blog --use-npm`

These source of [react-scripts](https://github.com/facebook/create-react-app/tree/main/packages/react-scripts) and configuration used by Create React App.

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

- **/node_modules** : Where all of the external libraries used to piece together the React app are located. You shouldn’t modify any of the code inside this folder as that would be modifying a third party library, and your changes would be overwritten the next time you run the npm install command.
- **/public** : Assets that aren’t compiled or dynamically generated are stored here. These can be static assets like logos or the robots.txt file.
- **/src** : Where we’ll be spending most of our time. The src, or source folder contains all of our React components, external CSS files, and dynamic assets that we’ll bring into our component files.

- **public\index.html** file, which is html entry point for the app
- **public\manifest.json** file, which is used with mobile phones. 
- **src\App.js** component, which is the root component for our blog, as well as the css and tests that go with it. 

#### Create
- **src\components\Home.js**


Use [<React.Fragment> tag](https://reactjs.org/docs/fragments.html)

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
Use [<></> tag for short syntax ](https://reactjs.org/docs/fragments.html#short-syntax)
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
#### Minimal React component
```js
import React from 'react';

const AddComment = () => { return <></> };

export default AddComment;
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

### Intall MongoDB Community Edition

[on macOS](https://docs.mongodb.com/manual/tutorial/install-mongodb-on-os-x/)
or [on Windows](https://docs.mongodb.com/manual/tutorial/install-mongodb-on-windows/)

The current isntallation package 5.0.4 on [download page](https://www.mongodb.com/try/download/community?tck=docs_server)

The lates [version on Choclatey](https://community.chocolatey.org/packages/mongodb#versionhistory)  MongoDB 5.1.1-rc0 

Installed Chocolatey 5.0.4
- `choco install mongodb --version=5.0.4`

It creates a Windows service: MongoDB Database Server (MongoDB): 
`"C:\Program Files\MongoDB\Server\5.0\bin\mongod.exe" --config "C:\Program Files\MongoDB\Server\5.0\bin\mongod.cfg" --service`

You alsow can install MongoDB on macOS via [Homebrew](https://brew.sh/) 
or [Installing the Latest mongodb-community Server, Shell, and the Database Tools Together](https://github.com/mongodb/homebrew-brew#installing-the-latest-mongodb-community-server-shell-and-the-database-tools-together)
Install the latest 5.0.x production release of MongoDB Community Server:
- `$ brew install mongodb-community@5.0`  
#### Create MongoDB database on macOS
Create the DIRECTORY(ies), if they do not already exist:
- `sudo mkdir -p data/db`
You needed to alter the owner using the CHOWN command
- ``sudo chown $USER /data/db /data/db``
-  
#### Create MongoDB database in Windows CMD

1. Create database directory.
    Create the data directory where MongoDB stores data. MongoDB's default data directory path is the absolute path \data\db on the drive from which you start MongoDB.

    From the Command Interpreter, create the data directories:

- `cd C:\`
- `md "\data\db"`

 2. Start your MongoDB database.¶
    To start MongoDB, run exe.

- `"C:\Program Files\MongoDB\Server\5.0\bin\mongod.exe" --dbpath="c:\data\db"`

    The --dbpath option points to your database directory.

    If the MongoDB database server is running correctly, the Command Interpreter displays:

    `[initandlisten] waiting for connections`

#### Install MongoDB Shell for Windows
To install MongoDB Shell, run the following command from the command line or from PowerShell:
- `choco install mongodb-shell`

in the following folder: `C:\ProgramData\chocolatey\lib\mongodb-shell\tools`

#### Open CMD and run Mongosh.exe
```cmd
Connecting to:          mongodb://127.0.0.1:27017/?directConnection=true&serverSelectionTimeoutMS=2000
Using MongoDB:          5.0.4
Using Mongosh:          1.1.2
```
#### MongoDb commands
Connect to the new database
- `use my-blog`

##### Insert new Collecion to the database:#####
```js 
db.articleVoutes.insert([
    {
        name: 'learn-react',
        voutes: 0,
        comments: []
    }, {
        name: 'learn-node',
        voutes: 0,
        comments: []
    }, {
        name: 'my-thoughts-on-resumes',
        voutes: 0,
        comments: []
    }
])
```

The result is:
```js
DeprecationWarning: Collection.insert() is deprecated. Use insertOne, insertMany, or bulkWrite.
{
  acknowledged: true,
  insertedIds: {
    '0': ObjectId("619ea11c155c9cfddce5907d"),
    '1': ObjectId("619ea11c155c9cfddce5907e"),
    '2': ObjectId("619ea11c155c9cfddce5907f")
  }
}
```

##### Get Names of all Collections
- `db.getCollectionNames()`
The result is:
```js
[ 'articleVotes' ]
```
##### Find all the articles in a Collection
- `db.articleVotes.find({})` or `db.articles.find({}).pretty()`

The result is:
```js
[
  {
    _id: ObjectId("619ea11c155c9cfddce5907d"),
    name: 'learn-react',
    voutes: 0,
    comments: []
  },
  {
    _id: ObjectId("619ea11c155c9cfddce5907e"),
    name: 'learn-node',
    voutes: 0,
    comments: []
  },
  {
    _id: ObjectId("619ea11c155c9cfddce5907f"),
    name: 'my-thoughts-on-resumes',
    voutes: 0,
    comments: []
  }
]
```
##### Search articles a Collection by the property #####
- `db.articleVotes.find({name: 'learn-node'})`

The result is:
```js
[
  {
    _id: ObjectId("619ea11c155c9cfddce5907e"),
    name: 'learn-node',
    voutes: 0,
    comments: []
  }
]
```
##### To exit, press Ctrl+C or Ctrl+D or type .exit



### MongoDB NodeJS Driver

[NPM MongoDB package](https://www.npmjs.com/package/mongodb)
[Latest Documentation for NodeJs package](https://github.com/mongodb/node-mongodb-native)
[Documentation for the pakage](https://docs.mongodb.com/drivers/)
- `npm install mongodb --save`

The latest npm `"mongodb": "^4.2.0"` package is [compatible](https://docs.mongodb.com/drivers/node/current/compatibility/#mongodb-compatibility) with the MongoDB 5.1 database

Not all commands are supported in NodeJs package driver

[Method Defenitions](https://github.com/DefinitelyTyped/DefinitelyTyped/blob/master/types/meteor/mongo.d.ts)

### Dynamic Context

[Theme Button Example](https://reactjs.org/docs/context.html#dynamic-context)

**ThemeContext.js**
```jsx
import React from 'react';

export const themes = {
    light: {
        foreground: '#000000',
        background: '#eeeeee',
    },
    dark: {
        foreground: '#ffffff',
        background: '#222222',
    }
};

export const ThemeContext = React.createContext(
    themes.dark // default value
);

```
**ThemeContextProvider.js**
```jsx
import React from 'react';
import { ThemeContext, themes } from './ThemeContext'
export class ThemeContextProvider extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            theme: themes.light,
        };

        this.toggleTheme = () => {
            this.setState(state => ({
                theme:
                    state.theme === themes.dark
                        ? themes.light
                        : themes.dark,
            }));
        };
    }
    render() {
        const value = { theme: this.state.theme, toggleTheme: this.toggleTheme }
        return <ThemeContext.Provider value={value}>{this.props.children}</ThemeContext.Provider>
    }
}
```
**App.js**
```jsx
...
import { ThemeContextProvider } from './components/ThemeContextProvider';
import { ThemeButton } from './pages/ThemeButton';

export default class App extends Component {
    static displayName = App.name;

    render() {
        return (
            <ThemeContextProvider>
                <Router>
                    <Layout>
                        <Switch>
                            ...
                            <Route path='/themebutton' component={ThemeButton} />
                            <Route path='/fetch-data' component={FetchData} />
                            ...
                        </Switch>
                    </Layout>
                </Router>
            </ThemeContextProvider>
        );
    }
}
```

```jsx
import React, { Component } from 'react';
import { ThemeContext } from '../components/ThemeContext';

export class ThemeButton extends Component {
    static displayName = ThemeButton.name;

    constructor(props) {
        super(props);
    }
    componentDidMount() {
        // let value = this.context;
        /* perform a side-effect at mount using the value of MyContext */
    }
    componentDidUpdate() {
        // let value = this.context;
        /* ... */
    }
    componentWillUnmount() {
        let value = this.context;
        /* ... */
    }

    // this.context: {
    //     theme: { foreground: '#000000', background: '#eeeeee' }
    //     toggleTheme: () => { … }
    //  }
    render() {
        // let props = this.props;
        let value = this.context;
        console.log(value);
        return (
            <>
                <h1>Theme Button</h1>

                <p>This is a simple example of accessing Context inside a React component.</p>

                <button className="btn"
                    style={{ color: value.theme.foreground, backgroundColor: value.theme.background }}
                    onClick={value.toggleTheme}
                >Change Color</button>
            </>
        );
    }
}

ThemeButton.contextType = ThemeContext;

```

