import { fetchNotes } from "@/lib/api";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import NotesClient from "./Notes.client";
import { Metadata } from "next";

type GenerateMetadataProps = {
  params: Promise<{slug:string[]}>
}
export async function generateMetadata({params}: GenerateMetadataProps): Promise<Metadata> {
  const { slug } = await params
  const descriptions: Record<string,string> = {
      All: `Browse all your notes in one place. Stay organized and access everything instantly with Notehub.`,
    Work: `Manage and share your work notes with  ease. Stay productive and organized using Notehub.`,
    Todo: `Keep track of your tasks and to-dos effortlessly. Notehub helps you stay on top of your list.`,
    Personal: `Store and organize your personal notes securely. Notehub makes it simple and private.`,
    Meeting: `Capture and share meeting notes instantly. Stay aligned and productive with Notehub.`,
    Shopping: `Plan and manage your shopping lists in seconds. Notehub keeps your essentials organized.`,
  }

  const tagKey = slug[0] === 'All' ? 'All' : slug[0];
  const description = descriptions[tagKey] || descriptions.All;

  return {
    title: 'NoteHub - Share Notes Instantly Online',
    description,
    openGraph:{
    title: 'NoteHub - Share Notes Instantly Online',
      description,
      siteName: 'NoteHub',
      type: 'website',
      images: [{
        url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
        width: 1200,
        height: 630,
        alt:'NoteHub - Share Notes Instantly Online'
      },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: 'NoteHub - Share Notes Instantly Online',
      description,
      images: [{
        url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
        width: 1200,
        height: 630,
        alt:'NoteHub - Share Notes Instantly Online'
      },
      ],
    }
}


}

type Props = {
  params: Promise<{ slug: string[] }>; 
};

export default async function Notes({ params }: Props) {
  const { slug } = await params;
  
  const filter = slug[0] === "All" ? undefined : slug[0];
  const queryClient = new QueryClient();
  
  await queryClient.prefetchQuery({
    queryKey: ["notes", { page: 1, search: "", tag: filter }],
    queryFn: () => fetchNotes(1, "", filter),
  });
  
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotesClient filter={filter} />
    </HydrationBoundary>
  );
}