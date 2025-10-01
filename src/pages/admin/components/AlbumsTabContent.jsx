import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Library } from "lucide-react";
import AddAlbumDialog from "./AddAlbumDialog";
import AlbumsTable from "./AlbumsTable";

const AlbumsTabContent = () => {
  return (
    <Card className="bg-zinc-950">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Library className="h-5 w-5 text-violet-500" />
              Albums Library
            </CardTitle>
            <CardDescription>Manage your album collection</CardDescription>
          </div>
          <AddAlbumDialog />
        </div>
      </CardHeader>

      <CardContent>
        <AlbumsTable />
      </CardContent>
    </Card>
  );
};
export default AlbumsTabContent;
