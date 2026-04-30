import {useEffect} from 'react';

export default function useTrack(name: string) {
  useEffect(() => {
    console.log(`mount ${name}`)

    return () => {
      console.log(`unmount ${name}`)
    }
  }, [name]);

  console.log(`rerender ${name}`)
}
