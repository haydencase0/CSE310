export type Greeting = {
  name: string;
  message: string;
};

export interface GreetingRepository {
  save(greeting: Greeting): Promise<void>;
}
