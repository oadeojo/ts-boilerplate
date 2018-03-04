/**
 * Container Generator
 */

const componentExists = require("../utils/componentExists");

module.exports = {
  description: "Add a container component",
  prompts: [
    {
      type: "list",
      name: "type",
      message: "Select the base component type:",
      default: "Stateless Function",
      choices: () => [
        "Stateless Function",
        "React.PureComponent",
        "React.Component"
      ]
    },
    {
      type: "input",
      name: "name",
      message: "What should it be called?",
      default: "Form",
      validate: value => {
        if (/.+/.test(value)) {
          return componentExists(value)
            ? "A component or container with this name already exists"
            : true;
        }

        return "The name is required";
      }
    },
    {
      type: "confirm",
      name: "wantHeaders",
      default: false,
      message: "Do you want headers?"
    },
    {
      type: "confirm",
      name: "wantMessages",
      default: true,
      message: "Do you want i18n messages (i.e. will this component use text)?"
    },
    {
      type: "confirm",
      name: "wantLoadable",
      default: true,
      message: "Do you want to load resources asynchronously?"
    }
  ],
  actions: data => {
    // Generate index.js and index.test.js
    var componentTemplate; // eslint-disable-line no-var

    switch (data.type) {
      case "Stateless Function": {
        componentTemplate = "./container/stateless.ts.hbs";
        break;
      }
      default: {
        componentTemplate = "./container/class.tsx.hbs";
      }
    }

    const actions = [
      {
        type: "add",
        path: "../../src/containers/{{properCase name}}/index.tsx",
        templateFile: componentTemplate,
        abortOnFail: true
      },
      {
        type: "add",
        path: "../../src/containers/{{properCase name}}/tests/index.test.tsx",
        templateFile: "./container/test.tsx.hbs",
        abortOnFail: true
      }
    ];

    // If component wants messages
    if (data.wantMessages) {
      actions.push({
        type: "add",
        path: "../../src/containers/{{properCase name}}/messages.ts",
        templateFile: "./container/messages.ts.hbs",
        abortOnFail: true
      });
    }

    if (data.wantLoadable) {
      actions.push({
        type: "add",
        path: "../../src/containers/{{properCase name}}/Loadable.ts",
        templateFile: "./component/loadable.ts.hbs",
        abortOnFail: true
      });
    }

    return actions;
  }
};
