const SONG_METADATA_KEYS = [
    'title',
    'subtitle',
    'bpm',
    'wave',
    'preimage',
    'offset',
    'demostart'
] as const;

const LEVEL_METADATA_KEYS = [
    'course',
    'level',
    'scoreinit',
    'scorediff',
    'notesdesigner'
] as const;

export async function parseTJA(selectedSong: string): Promise<songMetadata> {
    try {
        const response = await fetch(selectedSong);
        const text = await response.text();
        const lines = text.split(/\r?\n/);
        return extractSongMetadata(lines);
    } catch (err) {
        console.error("Failed to fetch or parse TJA file:", err);
        throw err;
    }
}

function extractSongMetadata(lines: string[]): songMetadata {
    let selectedSongMetadata: songMetadata = {
        title: "",
        subtitle: "",
        bpm: 0,
        wave: "",
        image: "",
        songStart: {
            offset: 0,
            demoStart: 0
        },
        levels: []
    };

    let i = 0;
    while (i < lines.length) {
        const line = lines[i].trim();

        if (line.toLowerCase().startsWith("course:")) {
            i = extractLevelMetadata(lines, i, selectedSongMetadata);
            continue;
        }

        if (line.includes(":")) {
            const { key, value } = splitLineToKeyValue(line);

            if (SONG_METADATA_KEYS.includes(key as any)) {
                switch (key) {
                    case 'title':
                        selectedSongMetadata.title = value;
                        break;
                    case 'subtitle':
                        selectedSongMetadata.subtitle = value;
                        break;
                    case 'bpm':
                        selectedSongMetadata.bpm = Number(value) || 0;
                        break;
                    case 'wave':
                        selectedSongMetadata.wave = "/songs/" + selectedSongMetadata.title + "/" + value;
                        break;
                    case 'preimage':
                        selectedSongMetadata.image = "/songs/" + selectedSongMetadata.title + "/" + value;
                        break;
                    case 'offset':
                        selectedSongMetadata.songStart.offset = Number(value) || 0;
                        break;
                    case 'demostart':
                        selectedSongMetadata.songStart.demoStart = Number(value) || 0;
                        break;
                }
            }
        }
        i++;
    }

    return selectedSongMetadata;
}

function extractLevelMetadata(lines: string[], startIndex: number, songMetadata: songMetadata): number {
    let levelMetadata: songLevel = {
        course: "",
        level: 0,
        scoreinit: 0,
        scorediff: 0,
        notesdesigner: "",
        chart: {
            data: []
        }
    };

    let i = startIndex;
    let readingChart = false;

    while (i < lines.length) {
        const line = lines[i].trim();

        if (line === "#START") {
            readingChart = true;
            i++;
            continue;
        }

        if (line === "#END") {
            songMetadata.levels.push(levelMetadata);
            return i + 1;
        }

        if (readingChart) {
            if (line) levelMetadata.chart.data.push(line);
        } else if (line.includes(":")) {
            const { key, value } = splitLineToKeyValue(line);

            if (LEVEL_METADATA_KEYS.includes(key as any)) {
                switch (key) {
                    case 'course':
                        levelMetadata.course = value;
                        break;
                    case 'level':
                        levelMetadata.level = Number(value) || 0;
                        break;
                    case 'scoreinit':
                        levelMetadata.scoreinit = Number(value) || 0;
                        break;
                    case 'scorediff':
                        levelMetadata.scorediff = Number(value) || 0;
                        break;
                    case 'notesdesigner':
                        levelMetadata.notesdesigner = value;
                        break;
                }
            }
        }
        i++;
    }

    return i;
}

function splitLineToKeyValue(line: string) {
    const colonIndex = line.indexOf(":");
    const key = line.substring(0, colonIndex).trim().toLowerCase();
    const value = line.substring(colonIndex + 1).trim();
    return { key, value };
}