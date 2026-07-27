type songMetadata = {
    title: string;
    subtitle: string;
    bpm: number;
    wave: string;
    image: string;
    songStart: {
        offset: number;
        demoStart: number;
    }
    levels: songLevel[];
}

type songLevel = {
    course: string;
    level: number;
    scoreinit: number;
    scorediff: number;
    notesdesigner: string;
    chart: {
        // The chart data from #START to #END.
        data: string[];
    }
}
