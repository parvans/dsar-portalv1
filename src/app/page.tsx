import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-muted px-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-center text-2xl">DSAR Portal</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground text-center">
            A Simple platform for managing Data Subject Access Requests.
          </p>

          <div className="flex flex-col. gap-3">
            <Link href="/auth/login">
              <Button className="w-full">
                Company Owner Login
              </Button>
            </Link>

            <Link href="/admin">
              <Button variant="outline" className="w-full">
                Admin Dashboard
              </Button>
            </Link>

          </div>
        </CardContent>
      </Card>
    </div>
  );
}
