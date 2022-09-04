import './App.css'

const Form = () => {
  return (
    <form>
      <label htmlFor="name">Name</label>
      <input type="text" name="name" id="name" required />

      <label htmlFor="surname">Surname</label>
      <input type="text" name="surname" id="surname" required />

      <label htmlFor="email">Email</label>
      <input type="email" name="email" id="email" required />

      <label htmlFor="date">Event date</label>
      <input type="date" name="date" id="date" required />
      <button>Submit</button>
    </form>
  )
}


export const App = () => {
  return (
    <main>
      <Form />
    </main>
  )
}
