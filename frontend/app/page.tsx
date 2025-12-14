import Image from "next/image"
import { readFileSync } from "fs"
import { join } from "path"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { MarkdownContent } from "@/components/markdown-content"
import examplePlaces from "@/data/example-places.json"

const projectDescription = readFileSync(
  join(process.cwd(), "content", "project-description.md"),
  "utf-8"
)

type Place = {
  id: string
  title: string
  image: string
  description: string
}

export default function Home() {
  const places: Place[] = examplePlaces

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16 md:py-24">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-foreground">
            Personalizowany Przewodnik Turystyczny
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Poznawaj miejsca historyczne i kulturowe w sposób dostosowany do Twojego tempa i uwagi
          </p>
        </div>
      </section>

      {/* Project Description */}
      <section className="container mx-auto px-4 py-12 md:py-16">
        <div className="max-w-4xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl md:text-3xl">O projekcie</CardTitle>
            </CardHeader>
            <CardContent>
              <MarkdownContent content={projectDescription} />
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Example Places */}
      <section className="container mx-auto px-4 py-12 md:py-16">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-8 text-center">
            Przykładowe miejsca do zwiedzania
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {places.map((place) => (
              <Card key={place.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="relative h-48 w-full">
                  <Image
                    src={place.image}
                    alt={place.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                </div>
                <CardHeader>
                  <CardTitle className="text-xl">{place.title}</CardTitle>
                  <CardDescription>{place.description}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
