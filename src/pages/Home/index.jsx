import GifsList from '../../components/GifsList';
import Spinner from '../../components/Spinner';
import useGifs from '../../hooks/useGifs';
import WithSidebar from '../../components/WithSidebar';
import { Helmet } from 'react-helmet';

export default function Home() {
  const { gifs, loading } = useGifs({ type: 'trending', limit: 12 });
  const GifListWithSidebar = WithSidebar(GifsList);
  // useSeo({ title: 'Giffy | Find your favorite gif', description: 'A web app to find your favorites Gifs' });

  return (
    <>
      <Helmet>
        <title>Giffy | Find your favorite gif</title>
      </Helmet>
      <div className="">
        {(
          loading ?
            <Spinner /> :
            <GifListWithSidebar gifs={gifs} title={'📈 Trending Gifs'} cols={3} />
        )}
      </div>
    </>
  )
}
