export function handleVolumeChange(setVolume: (volume: number) => void ) {
    return function (e:React.ChangeEvent<HTMLInputElement>) {
        setVolume(Number(e.target.value));
    }
}

export function handleLoopingCheck(setIsLooping: (isLooping: boolean) => void ) {
    return function (e:React.ChangeEvent<HTMLInputElement>) {
        setIsLooping(e.target.checked);
    }
}

export function handleZoomLevelChange(setZoomLevel: (zoom: number) => void ) {
    return function (e:React.ChangeEvent<HTMLInputElement>) {
        setZoomLevel(Number(e.target.value));
    }
}

