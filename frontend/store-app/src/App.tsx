function App() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background p-4 text-foreground">
      <div className="max-w-md space-y-4 text-center">
        <h1 className="text-4xl font-bold tracking-tight text-primary">
          E-commerce Platform
        </h1>
        <p className="text-lg text-muted-foreground">
          Benvenuto nel tuo nuovo store. Il frontend è configurato correttamente con Tailwind CSS e shadcn/ui.
        </p>
        <div className="flex justify-center gap-4">
          <div className="h-2 w-2 animate-bounce rounded-full bg-primary [animation-delay:-0.3s]"></div>
          <div className="h-2 w-2 animate-bounce rounded-full bg-primary [animation-delay:-0.15s]"></div>
          <div className="h-2 w-2 animate-bounce rounded-full bg-primary"></div>
        </div>
      </div>
    </div>
  )
}

export default App