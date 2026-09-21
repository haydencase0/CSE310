# My Tasks

My Tasks is a small Next.js web app for managing a local task list and creating saved personal greetings. It demonstrates a three-tier design: React components collect and display information, services enforce the app's rules, and repositories store data in browser local storage.

Features include:

- Create, complete, and delete tasks.
- Persist tasks between browser refreshes.
- Enter a name and receive a `Hello [name]` response.
- Save submitted names and greeting messages in browser local storage.

Tasks are stored under `multimodel-todo.tasks`; greetings are stored under `multimodel-hello.greetings`.

## Instructions for Build and Use

To install dependencies and start the development server:

1. Install [Node.js](https://nodejs.org/). Node 24 was used during development.
2. Run `npm install` from the project folder.
3. Run `npm run dev`.
4. Open the local address printed in the terminal, usually `http://localhost:3000`.

Instructions for using the software:

1. Type a name in the **Say hello** form and select **Say hello**. The app displays the generated greeting and saves it locally.
2. Type a task in the **New task** field and select **Add task**.
3. Select a task's checkbox to mark it complete, or select **Delete** to remove it.

Available project commands:

- `npm test` runs the Vitest test suite.
- `npm run lint` checks the project with ESLint.
- `npm run build` creates a production build.

## Development Environment

To recreate the development environment, install the following tools and project libraries:

- Node.js 24 (development environment)
- TypeScript 5.9
- Next.js 16.1
- React 19.2
- Vitest 4.0 and Testing Library
- ESLint 9.39

## Useful Websites to Learn More

These official resources are useful when developing this project:

- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev/learn)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/intro.html)
- [Vitest Documentation](https://vitest.dev/guide/)
- [MDN: Window localStorage](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage)

## Future Work

The following items could improve the project in the future:

- [ ] Add task editing and due dates.
- [ ] Add tests for task deletion and completion from the user interface.
- [ ] Let users view and clear saved greeting history.
- [ ] Add a server-side database and user accounts.
