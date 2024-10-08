import CreateForm from './CreateForm'

export default async function CreateBookEntry() {
  return (
    <main>
      <h2 className="text-center">Enter a new book entry</h2>
      <CreateForm />
    </main>
  )
}