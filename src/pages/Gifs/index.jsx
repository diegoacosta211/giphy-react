import { useEffect, useRef, useCallback } from 'react';
import GifsList from '../../components/GifsList';
import Spinner from '../../components/Spinner';
import useGifs from '../../hooks/useGifs';
import useNearScreen from '../../hooks/useNearScreen';
import debounce from 'just-debounce-it';
import { Helmet } from 'react-helmet';

export default function Gifs({ params: { keyword, rating } }) {
  const prevQuery = useRef('');
  const elRef = useRef();
  const { gifs, loading, setPage } = useGifs({ type: 'search', query: keyword, limit: 16, rating});
  const { isNearScreen } = useNearScreen({
    externalRef: loading ? null : elRef,
    once: false
  });
  let decodedKeyword = decodeURI(keyword);
  const title = gifs ? `${gifs.length} results of ${decodedKeyword}` : '';

  const handleNext = () => {
    setPage(prev => prev + 1);
  }
  // eslint-disable-next-line
  const handleDebouncedNextPage = useCallback(debounce(handleNext, 500),
  []);

  useEffect(() => {
    if (isNearScreen) handleDebouncedNextPage()

    // reset page when keyword term change
    if (prevQuery.current !== '' && prevQuery.current !== keyword) {
      setPage(0);
    }

    prevQuery.current = keyword;

  }, [isNearScreen, handleDebouncedNextPage, keyword, setPage]);

  if (loading) return <Spinner />;

  return (
    <>
      <Helmet>
        <title>{title}</title>
        <meta
          name="description"
          content={`Gifs related by the term ${decodedKeyword}`}
        />
      </Helmet>
      <div className="mb-7">
        <GifsList gifs={gifs} title={`🔎 ${decodedKeyword}`}/>
        <div id="infinite-scroll-visor" ref={elRef}></div>
      </div>
    </>

  )
}
