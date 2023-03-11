export interface SummonerDto {
    "id": string,
    "accountId": string,
    "puuid": string,
    "name": string,
    "profileIconId": number,
    "revisionDate": number,
    "summonerLevel": number
    "leagues": SummonerLeagueDto[],
    "leagues2021": SummonerLeagueDto[],
    "ranking": RankingsDto,
}

export interface RankingsDto {
    currentFlexQueueRating: number,
    currentSoloQueueRating: number,
    flexQueueRanks: RankDto[],
    soloQueueRanks: RankDto[],
}

export interface RankDto {
    points: number,
    rank: string,
    rating: number,
    tier: string
    timestamp: number,
}

export interface MiniSeriesDTO {
    progress: string;
    losses: number;
    target: number;
    wins: number;
}

export interface SummonerLeagueDto {
    queueType: string;
    summonerName: string;
    hotStreak: boolean;
    miniSeries?: MiniSeriesDTO;
    wins: number;
    veteran: boolean;
    losses: number;
    rank: string;
    leagueId: string;
    inactive: boolean;
    freshBlood: boolean;
    tier: string;
    summonerId: string;
    leaguePoints: number;
}
