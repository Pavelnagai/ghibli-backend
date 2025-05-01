import { ImageStyle, StyleGenerator } from '../../types/styles';
import { GhibliStyleGenerator } from './ghibli';
import { PixarStyleGenerator } from './pixar';
import { DisneyStyleGenerator } from './disney';
import { AnimeStyleGenerator } from './anime';
import { WatercolorStyleGenerator } from './watercolor';
import { OilPaintingStyleGenerator } from './oil-painting';
import { PixelArtStyleGenerator } from './pixel-art';

export class StyleGeneratorFactory {
    static createGenerator(style: ImageStyle): StyleGenerator {
        switch (style) {
            case ImageStyle.GHIBLI:
                return new GhibliStyleGenerator();
            case ImageStyle.PIXAR:
                return new PixarStyleGenerator();
            case ImageStyle.DISNEY:
                return new DisneyStyleGenerator();
            case ImageStyle.ANIME:
                return new AnimeStyleGenerator();
            case ImageStyle.WATERCOLOR:
                return new WatercolorStyleGenerator();
            case ImageStyle.OIL_PAINTING:
                return new OilPaintingStyleGenerator();
            case ImageStyle.PIXEL_ART:
                return new PixelArtStyleGenerator();
            default:
                throw new Error(`Unsupported style: ${style}`);
        }
    }
} 