import { screen, Rectangle } from 'electron';

export default function calcScreenOffset(sourceRect: { width: number, height: number }): Rectangle {
    const x = parseInt(process.argv[process.argv.findIndex(l => '--offsetX' === l) + 1], 10);
    const y = parseInt(process.argv[process.argv.findIndex(l => '--offsetY' === l) + 1], 10);

    if (x === x && y === y) {
        const primaryDisplay = screen.getPrimaryDisplay();
        const resultX = Math.round((primaryDisplay.workArea.width / 2) - (sourceRect.width / 2) + x);
        const resultY = Math.round((primaryDisplay.workArea.height / 2) - (sourceRect.height / 2) + y);

        return {
            x: resultX,
            y: resultY,
            width: sourceRect.width,
            height: sourceRect.height
        };
    }
    else {
        return {
            x: null,
            y: null,
            width: sourceRect.width,
            height: sourceRect.height
        };
    }
}