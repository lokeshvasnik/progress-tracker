import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import data from '@/public/data.json'

export default function Home() {
  function singleData(
    value: { data_title: string; data_username: string; data_password: string; data_color: string; },
    index: number
  ): React.ReactNode {
    return (
      <Card className={`min-w-64 bg-[${value.data_color}]`} key={index}>
        <CardHeader>
          <CardTitle>{value.data_title}</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Username: {value.data_username}</p>
          <CardDescription>{value.data_password}</CardDescription>
        </CardContent>
        <CardFooter>
          <p>{new Date().toLocaleDateString()}</p>
        </CardFooter>
      </Card>
    );
  }
  return (
    <div className="font-[family-name:var(--font-geist-sans)]">
      <header className="bg-yellow-400 text-center py-2">
            <p>Password Manager</p>
      </header>

      <section className="min-h-screen p-8 pb-20 gap-16 sm:p-20 ">
        <main className="flex flex-wrap gap-x-8 gap-y-10">
        {data?.map(singleData)}
        </main>
      </section>
    </div>
  );
}
