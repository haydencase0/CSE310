"use client";

import { FormEvent, useState } from "react";
import type { HelloUserServicePort } from "../services/HelloUserService";

type HelloUserFormProps = { service: HelloUserServicePort };

export function HelloUserForm({ service }: HelloUserFormProps) {
  const [name, setName] = useState("");
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    try {
      setMessage(await service.greet(name));
    } catch (reason) {
      setMessage(null);
      setError(reason instanceof Error ? reason.message : "Greeting could not be created.");
    }
  }

  return (
    <section className="hello-user" aria-labelledby="hello-heading">
      <h2 id="hello-heading">Say hello</h2>
      <form onSubmit={submit}>
        <label htmlFor="user-name">Your name</label>
        <div className="task-form-row">
          <input id="user-name" value={name} onChange={(event) => setName(event.target.value)} />
          <button type="submit">Say hello</button>
        </div>
      </form>
      {message && <p role="status">{message}</p>}
      {error && <p className="error" role="alert">{error}</p>}
    </section>
  );
}
