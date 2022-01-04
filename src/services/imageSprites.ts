export interface SpriteImageDto {
    full: string,
    sprite: string,
    group: string,
    x: number,
    y: number,
    w: number,
    h: number,
}

export function summonerSpellStyles(image: SpriteImageDto) {
    if(!image) { return }
    const modifier = .5;
    const backgroundOriginalWidth = 480;
    return {
        width: (image.w * modifier) + 'px',
        height: (image.h * modifier) + 'px',
        background: `url(sprite/spell0.png) -${image.x * modifier}px -${image.y * modifier}px`,
        'background-size': `${backgroundOriginalWidth * modifier}px`,
    };
}

export function championStyle(image: SpriteImageDto, scale?: number) {
    if(!image) { return }
    const modifier = scale || 1;
    const backgroundOriginalWidth = 480;
    return {
        width: (image.w * modifier) + 'px',
        height: (image.h * modifier) + 'px',
        background: `url(sprite/${image.sprite}) -${image.x * modifier}px -${image.y * modifier}px`,
        'background-size': `${backgroundOriginalWidth * modifier}px`,
    };
}
