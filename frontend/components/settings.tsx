"use client"

import * as React from "react"
import { useTheme } from "@/components/theme-provider"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { getStorageString, setStorageString } from "@/lib/storage"
import targetGroupsData from "@/data/target-groups.json"

type TargetGroup = {
  code: string
  label: string
}

export function Settings() {
  const { theme, setTheme } = useTheme()
  
  // Inicjalizuj z wartościami domyślnymi (bez localStorage, aby uniknąć problemów z hydracją)
  const [formTheme, setFormTheme] = React.useState<string>("light")
  const [formTargetGroup, setFormTargetGroup] = React.useState<string>(
    targetGroupsData.length > 0 ? targetGroupsData[0].code : ""
  )
  const [isMounted, setIsMounted] = React.useState(false)

  // Wczytaj wartości z localStorage po hydracji
  React.useEffect(() => {
    setIsMounted(true)
    const savedTheme = getStorageString("theme", "light")
    const savedTargetGroup = getStorageString(
      "targetGroup",
      targetGroupsData.length > 0 ? targetGroupsData[0].code : ""
    )
    
    setFormTheme(savedTheme)
    setFormTargetGroup(savedTargetGroup)
  }, [])

  // Synchronizuj formTheme z aktualnym motywem z ThemeProvider
  React.useEffect(() => {
    if (isMounted) {
      setFormTheme(theme)
    }
  }, [theme, isMounted])

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    // Zapisz w localStorage używając serwisu
    setStorageString("theme", formTheme)
    setStorageString("targetGroup", formTargetGroup)

    // Wprowadź zmiany
    setTheme(formTheme as "light" | "dark")
  }

  const targetGroups: TargetGroup[] = targetGroupsData

  return (
    <form onSubmit={handleSubmit}>
      <Card>
        <CardHeader>
          <CardTitle>Ustawienia</CardTitle>
          <CardDescription>
            Zarządzaj preferencjami wyświetlania i stylizacji aplikacji
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="theme">Motyw</Label>
            <Select value={formTheme} onValueChange={setFormTheme}>
              <SelectTrigger id="theme" className="w-full">
                <SelectValue placeholder="Wybierz motyw" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="light">Jasny</SelectItem>
                <SelectItem value="dark">Ciemny</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="target-group">Grupa docelowa</Label>
            <Select value={formTargetGroup} onValueChange={setFormTargetGroup}>
              <SelectTrigger id="target-group" className="w-full">
                <SelectValue placeholder="Wybierz grupę docelową" />
              </SelectTrigger>
              <SelectContent>
                {targetGroups.map((group) => (
                  <SelectItem key={group.code} value={group.code}>
                    {group.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
        <CardFooter>
          <Button type="submit" className="w-full">
            Zapisz zmiany
          </Button>
        </CardFooter>
      </Card>
    </form>
  )
}

