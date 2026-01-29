import pokemon from "@/classes/pokemon";

const pkClass = new pokemon();

describe('checkRegulation ポケモンフェスタ2003', () => {
    test('解禁済ポケモン', () => {
        expect(
            pkClass.checkRegulation(
                '2002-11-21', '2003-08-24', ['ソーナノ・ソーナンス',],
                'レックウザ',
                100,
                '',
                '',
                '',
                '',
            )
        ).toEqual(
            {
                pokemon: true,
                level: true,
                move1: true,
                move2: true,
                move3: true,
                move4: true,
                pokemon_text: '使用可能',
                level_text: '使用可能',
                move1_text: '',
                move2_text: '',
                move3_text: '',
                move4_text: '',
            }
        );
    });

    test('未解禁ポケモン', () => {
        expect(
            pkClass.checkRegulation(
                '2002-11-21', '2003-08-24', ['ソーナノ・ソーナンス',],
                'デオキシス',
                100,
                'サイコブースト',
                'シャドーボール',
                'かみなり',
                'れいとうビーム',
            )
        ).toEqual(
            {
                pokemon: false,
                level: false,
                move1: false,
                move2: false,
                move3: false,
                move4: false,
                pokemon_text: '未解禁のポケモンです',
                level_text: '',
                move1_text: '',
                move2_text: '',
                move3_text: '',
                move4_text: '',
            }
        );
    });

    test('使用禁止ポケモン', () => {
        expect(
            pkClass.checkRegulation(
                '2002-11-21', '2003-08-24', ['ソーナノ・ソーナンス',],
                'ソーナンス',
                100,
                'カウンター',
                'ミラーコート',
                'アンコール',
                'みちづれ',
            )
        ).toEqual(
            {
                pokemon: false,
                level: false,
                move1: false,
                move2: false,
                move3: false,
                move4: false,
                pokemon_text: '使用禁止のポケモンです',
                level_text: '',
                move1_text: '',
                move2_text: '',
                move3_text: '',
                move4_text: '',
            }
        );
    });
});

describe('checkRegulation ポケモンリーグ2004', () => {
    test('解禁済ポケモン', () => {
        expect(
            pkClass.checkRegulation(
                '2002-11-21', '2004-08-15', ['幻',],
                'ゲンガー',
                50,
                '',
                '',
                '',
                '',
            )
        ).toEqual(
            {
                pokemon: true,
                level: true,
                move1: true,
                move2: true,
                move3: true,
                move4: true,
                pokemon_text: '使用可能',
                level_text: '使用可能',
                move1_text: '',
                move2_text: '',
                move3_text: '',
                move4_text: '',
            }
        );
    });

    test('使用禁止ポケモン', () => {
        expect(
            pkClass.checkRegulation(
                '2002-11-21', '2004-08-15', ['幻',],
                'セレビィ',
                50,
                'ギガドレイン',
                'シャドーボール',
                'やどりぎのタネ',
                'こうごうせい',
            )
        ).toEqual(
            {
                pokemon: false,
                level: false,
                move1: false,
                move2: false,
                move3: false,
                move4: false,
                pokemon_text: '使用禁止のポケモンです',
                level_text: '',
                move1_text: '',
                move2_text: '',
                move3_text: '',
                move4_text: '',
            }
        );
    });

    test('使用不可レベル', () => {
        expect(
            pkClass.checkRegulation(
                '2002-11-21', '2004-08-15', ['幻',],
                'レックウザ',
                50,
                'めざめるパワー',
                'じしん',
                'かみなり',
                'まもる',
            )
        ).toEqual(
            {
                pokemon: true,
                level: false,
                move1: false,
                move2: false,
                move3: false,
                move4: false,
                pokemon_text: '使用可能',
                level_text: '解禁されている最小レベルを下回っています',
                move1_text: '',
                move2_text: '',
                move3_text: '',
                move4_text: '',
            }
        );
    });

    test('スケッチ可能わざ', () => {
        expect(
            pkClass.checkRegulation(
                '2002-11-21', '2004-08-15', ['幻',],
                'ドーブル',
                50,
                'スケッチ',
                'ねこだまし',
                'へんしん',
                'ボルテッカー',
            )
        ).toEqual(
            {
                pokemon: true,
                level: true,
                move1: true,
                move2: true,
                move3: true,
                move4: false,
                pokemon_text: '使用可能',
                level_text: '使用可能',
                move1_text: '取得可能',
                move2_text: '取得可能',
                move3_text: '取得可能',
                move4_text: '取得不能なわざです',
            }
        );
    });

    test('教えわざ', () => {
        expect(
            pkClass.checkRegulation(
                '2002-11-21', '2004-08-15', ['幻',],
                'メタグロス',
                50,
                'コメットパンチ',
                'じしん',
                'だいばくはつ',
                'まもる',
            )
        ).toEqual(
            {
                pokemon: true,
                level: true,
                move1: true,
                move2: true,
                move3: true,
                move4: true,
                pokemon_text: '使用可能',
                level_text: '使用可能',
                move1_text: '取得可能',
                move2_text: '取得可能',
                move3_text: '取得可能',
                move4_text: '取得可能',
            }
        );
    });

    test('未解禁わざ', () => {
        expect(
            pkClass.checkRegulation(
                '2002-11-21', '2004-08-15', ['幻',],
                'カビゴン',
                50,
                'おんがえし',
                'じわれ',
                'じばく',
                'まもる',
            )
        ).toEqual(
            {
                pokemon: true,
                level: true,
                move1: true,
                move2: false,
                move3: false,
                move4: true,
                pokemon_text: '使用可能',
                level_text: '使用可能',
                move1_text: '取得可能',
                move2_text: '遺伝経路のない取得不能なわざです',
                move3_text: '取得不能なわざです',
                move4_text: '取得可能',
            }
        );
    });

    test('未解禁わざ', () => {
        expect(
            pkClass.checkRegulation(
                '2002-11-21', '2004-08-15', ['幻',],
                'メタグロス',
                50,
                'コメットパンチ',
                'ばくれつパンチ',
                'だいばくはつ',
                'まもる',
            )
        ).toEqual(
            {
                pokemon: true,
                level: true,
                move1: true,
                move2: false,
                move3: true,
                move4: true,
                pokemon_text: '使用可能',
                level_text: '使用可能',
                move1_text: '取得可能',
                move2_text: '取得不能なわざです',
                move3_text: '取得可能',
                move4_text: '取得可能',
            }
        );
    });

    test('未解禁わざ', () => {
        expect(
            pkClass.checkRegulation(
                '2002-11-21', '2004-08-15', ['幻',],
                'サンダー',
                50,
                '１０まんボルト',
                'じんつうりき',
                'ドリルくちばし',
                'まもる',
            )
        ).toEqual(
            {
                pokemon: true,
                level: true,
                move1: true,
                move2: false,
                move3: true,
                move4: true,
                pokemon_text: '使用可能',
                level_text: '使用可能',
                move1_text: '取得可能',
                move2_text: '取得不能なわざです',
                move3_text: '取得可能',
                move4_text: '取得可能',
            }
        );
    });
});

describe('checkRegulation 前期シングル', () => {
    test('解禁済ポケモン', () => {
        expect(
            pkClass.checkRegulation(
                '2002-11-21', '2003-11-20', ['ラティオス・ラティアス', '禁止伝説', '幻',],
                'ジュカイン',
                50,
                '',
                '',
                '',
                '',
            )
        ).toEqual(
            {
                pokemon: true,
                level: true,
                move1: true,
                move2: true,
                move3: true,
                move4: true,
                pokemon_text: '使用可能',
                level_text: '使用可能',
                move1_text: '',
                move2_text: '',
                move3_text: '',
                move4_text: '',
            }
        );
    });

    test('未解禁ポケモン', () => {
        expect(
            pkClass.checkRegulation(
                '2002-11-21', '2003-11-20', ['ラティオス・ラティアス', '禁止伝説', '幻',],
                'カビゴン',
                50,
                'のしかかり',
                'シャドーボール',
                'のろい',
                'ねむる',
            )
        ).toEqual(
            {
                pokemon: false,
                level: false,
                move1: false,
                move2: false,
                move3: false,
                move4: false,
                pokemon_text: '未解禁のポケモンです',
                level_text: '',
                move1_text: '',
                move2_text: '',
                move3_text: '',
                move4_text: '',
            }
        );
    });

    test('使用禁止ポケモン ラティオス・ラティアス', () => {
        expect(
            pkClass.checkRegulation(
                '2002-11-21', '2003-11-20', ['ラティオス・ラティアス', '禁止伝説', '幻',],
                'ラティオス',
                50,
                'ドラゴンクロー',
                'なみのり',
                'めいそう',
                'じこさいせい',
            )
        ).toEqual(
            {
                pokemon: false,
                level: false,
                move1: false,
                move2: false,
                move3: false,
                move4: false,
                pokemon_text: '使用禁止のポケモンです',
                level_text: '',
                move1_text: '',
                move2_text: '',
                move3_text: '',
                move4_text: '',
            }
        );
    });

    test('使用禁止ポケモン 禁止伝説', () => {
        expect(
            pkClass.checkRegulation(
                '2002-11-21', '2003-11-20', ['ラティオス・ラティアス', '禁止伝説', '幻',],
                'グラードン',
                50,
                'じしん',
                'げんしのちから',
                'マッドショット',
                'めざめるパワー',
            )
        ).toEqual(
            {
                pokemon: false,
                level: false,
                move1: false,
                move2: false,
                move3: false,
                move4: false,
                pokemon_text: '使用禁止のポケモンです',
                level_text: '',
                move1_text: '',
                move2_text: '',
                move3_text: '',
                move4_text: '',
            }
        );
    });

    test('使用禁止ポケモン 幻', () => {
        expect(
            pkClass.checkRegulation(
                '2002-11-21', '2003-11-20', ['ラティオス・ラティアス', '禁止伝説', '幻',],
                'ジラーチ',
                50,
                'はめつのねがい',
                'かみなり',
                'ねがいごと',
                'どくどく',
            )
        ).toEqual(
            {
                pokemon: false,
                level: false,
                move1: false,
                move2: false,
                move3: false,
                move4: false,
                pokemon_text: '使用禁止のポケモンです',
                level_text: '',
                move1_text: '',
                move2_text: '',
                move3_text: '',
                move4_text: '',
            }
        );
    });

    test('使用可能レベル', () => {
        expect(
            pkClass.checkRegulation(
                '2002-11-21', '2003-11-20', ['ラティオス・ラティアス', '禁止伝説', '幻',],
                'ヒトデマン',
                25,
                '',
                '',
                '',
                '',
            )
        ).toEqual(
            {
                pokemon: true,
                level: true,
                move1: true,
                move2: true,
                move3: true,
                move4: true,
                pokemon_text: '使用可能',
                level_text: '使用可能',
                move1_text: '',
                move2_text: '',
                move3_text: '',
                move4_text: '',
            }
        );
    });

    test('使用不可レベル', () => {
        expect(
            pkClass.checkRegulation(
                '2002-11-21', '2003-11-20', ['ラティオス・ラティアス', '禁止伝説', '幻',],
                'ヒトデマン',
                24,
                '',
                '',
                '',
                '',
            )
        ).toEqual(
            {
                pokemon: true,
                level: false,
                move1: false,
                move2: false,
                move3: false,
                move4: false,
                pokemon_text: '使用可能',
                level_text: '解禁されている最小レベルを下回っています',
                move1_text: '',
                move2_text: '',
                move3_text: '',
                move4_text: '',
            }
        );
    });

    test('遺伝わざなし', () => {
        expect(
            pkClass.checkRegulation(
                '2002-11-21', '2003-11-20', ['ラティオス・ラティアス', '禁止伝説', '幻',],
                'ジュカイン',
                50,
                'リーフブレード',
                'ドラゴンクロー',
                'ギガドレイン',
                'じしん',
            )
        ).toEqual(
            {
                pokemon: true,
                level: true,
                move1: true,
                move2: true,
                move3: true,
                move4: true,
                pokemon_text: '使用可能',
                level_text: '使用可能',
                move1_text: '取得可能',
                move2_text: '取得可能',
                move3_text: '取得可能',
                move4_text: '取得可能',
            }
        );
    });

    test('遺伝わざあり', () => {
        expect(
            pkClass.checkRegulation(
                '2002-11-21', '2003-11-20', ['ラティオス・ラティアス', '禁止伝説', '幻',],
                'ヘラクロス',
                50,
                'メガホーン',
                'きあいパンチ',
                'めざめるパワー',
                'かわらわり',
            )
        ).toEqual(
            {
                pokemon: true,
                level: true,
                move1: true,
                move2: true,
                move3: true,
                move4: true,
                pokemon_text: '使用可能',
                level_text: '使用可能',
                move1_text: '取得可能',
                move2_text: '取得可能',
                move3_text: '取得可能',
                move4_text: '取得可能',
            }
        );
    });

    test('遺伝わざ複数あり', () => {
        expect(
            pkClass.checkRegulation(
                '2002-11-21', '2003-11-20', ['ラティオス・ラティアス', '禁止伝説', '幻',],
                'バシャーモ',
                50,
                'オーバーヒート',
                'きあいパンチ',
                'きしかいせい',
                'こらえる',
            )
        ).toEqual(
            {
                pokemon: true,
                level: true,
                move1: true,
                move2: true,
                move3: true,
                move4: true,
                pokemon_text: '使用可能',
                level_text: '使用可能',
                move1_text: '取得可能',
                move2_text: '取得可能',
                move3_text: '取得可能',
                move4_text: '取得可能',
            }
        );
    });

    test('遺伝不可', () => {
        expect(
            pkClass.checkRegulation(
                '2002-11-21', '2003-11-20', ['ラティオス・ラティアス', '禁止伝説', '幻',],
                'サマヨール',
                50,
                'シャドーボール',
                'いたみわけ',
                'おにび',
                'ねむる',
            )
        ).toEqual(
            {
                pokemon: true,
                level: true,
                move1: true,
                move2: false,
                move3: true,
                move4: true,
                pokemon_text: '使用可能',
                level_text: '使用可能',
                move1_text: '取得可能',
                move2_text: '遺伝経路のない取得不能なわざです',
                move3_text: '取得可能',
                move4_text: '取得可能',
            }
        );
    });

    test('同時遺伝不可', () => {
        expect(
            pkClass.checkRegulation(
                '2002-11-21', '2003-11-20', ['ラティオス・ラティアス', '禁止伝説', '幻',],
                'フーディン',
                50,
                'サイコキネシス',
                'ほのおのパンチ',
                'アンコール',
                'じこさいせい',
            )
        ).toEqual(
            {
                pokemon: true,
                level: true,
                move1: true,
                move2: false,
                move3: false,
                move4: true,
                pokemon_text: '使用可能',
                level_text: '使用可能',
                move1_text: '取得可能',
                move2_text: '遺伝経路のない取得不能なわざです',
                move3_text: '遺伝経路のない取得不能なわざです',
                move4_text: '取得可能',
            }
        );
    });

    test('同時遺伝不可', () => {
        expect(
            pkClass.checkRegulation(
                '2002-11-21', '2003-11-20', ['ラティオス・ラティアス', '禁止伝説', '幻',],
                'サイドン',
                50,
                'いわなだれ',
                'カウンター',
                'ブレイククロー',
                'のろい',
            )
        ).toEqual(
            {
                pokemon: true,
                level: true,
                move1: false,
                move2: false,
                move3: false,
                move4: false,
                pokemon_text: '使用可能',
                level_text: '使用可能',
                move1_text: '遺伝経路のない取得不能なわざです',
                move2_text: '遺伝経路のない取得不能なわざです',
                move3_text: '遺伝経路のない取得不能なわざです',
                move4_text: '遺伝経路のない取得不能なわざです',
            }
        );
    });

    test('オーバーレベル', () => {
        expect(
            pkClass.checkRegulation(
                '2002-11-21', '2003-11-20', ['ラティオス・ラティアス', '禁止伝説', '幻',],
                'メタグロス',
                50,
                'コメットパンチ',
                'じしん',
                'めざめるパワー',
                'こうそくいどう',
            )
        ).toEqual(
            {
                pokemon: true,
                level: true,
                move1: true,
                move2: true,
                move3: true,
                move4: false,
                pokemon_text: '使用可能',
                level_text: '使用可能',
                move1_text: '取得可能',
                move2_text: '取得可能',
                move3_text: '取得可能',
                move4_text: 'オーバーレベルのため取得不能なわざです',
            }
        );
    });

    test('オーバーレベル', () => {
        expect(
            pkClass.checkRegulation(
                '2002-11-21', '2003-11-20', ['ラティオス・ラティアス', '禁止伝説', '幻',],
                'ジグザグマ',
                2,
                'じたばた',
                'めざめるパワー',
                'みがわり',
                'トリック',
            )
        ).toEqual(
            {
                pokemon: true,
                level: true,
                move1: false,
                move2: true,
                move3: false,
                move4: false,
                pokemon_text: '使用可能',
                level_text: '使用可能',
                move1_text: '野生で入手したポケモンのため取得不能なわざです',
                move2_text: '取得可能',
                move3_text: '野生で入手したポケモンのため取得不能なわざです',
                move4_text: '野生で入手したポケモンのため取得不能なわざです',
            }
        );
    });

    test('進化わざ', () => {
        expect(
            pkClass.checkRegulation(
                '2002-11-21', '2003-11-20', ['ラティオス・ラティアス', '禁止伝説', '幻',],
                'ヌケニン',
                50,
                'ぎんいろのかぜ',
                'シャドーボール',
                'めざめるパワー',
                'バトンタッチ',
            )
        ).toEqual(
            {
                pokemon: true,
                level: true,
                move1: true,
                move2: true,
                move3: true,
                move4: true,
                pokemon_text: '使用可能',
                level_text: '使用可能',
                move1_text: '取得可能',
                move2_text: '取得可能',
                move3_text: '取得可能',
                move4_text: '取得可能',
            }
        );
    });

    test('進化わざ 両立不可', () => {
        expect(
            pkClass.checkRegulation(
                '2002-11-21', '2003-11-20', ['ラティオス・ラティアス', '禁止伝説', '幻',],
                'ヌケニン',
                50,
                'ぎんいろのかぜ',
                'シャドーボール',
                'つるぎのまい',
                'バトンタッチ',
            )
        ).toEqual(
            {
                pokemon: true,
                level: true,
                move1: true,
                move2: true,
                move3: false,
                move4: false,
                pokemon_text: '使用可能',
                level_text: '使用可能',
                move1_text: '取得可能',
                move2_text: '取得可能',
                move3_text: '他の進化わざと同時に取得不能なわざです',
                move4_text: '他の進化わざと同時に取得不能なわざです',
            }
        );
    });

    test('ルリリ限定わざ', () => {
        expect(
            pkClass.checkRegulation(
                '2002-11-21', '2003-11-20', ['ラティオス・ラティアス', '禁止伝説', '幻',],
                'マリルリ',
                50,
                'ハイドロポンプ',
                'れいとうビーム',
                'アンコール',
                'ほろびのうた',
            )
        ).toEqual(
            {
                pokemon: true,
                level: true,
                move1: true,
                move2: true,
                move3: true,
                move4: false,
                pokemon_text: '使用可能',
                level_text: '使用可能',
                move1_text: '取得可能',
                move2_text: '取得可能',
                move3_text: '取得可能',
                move4_text: 'ルリリでしか取得できないわざと同時に取得不能なわざです',
            }
        );
    });

    test('ルリリ限定わざなし', () => {
        expect(
            pkClass.checkRegulation(
                '2002-11-21', '2003-11-20', ['ラティオス・ラティアス', '禁止伝説', '幻',],
                'マリルリ',
                50,
                'ハイドロポンプ',
                'れいとうビーム',
                'はらだいこ',
                'ほろびのうた',
            )
        ).toEqual(
            {
                pokemon: true,
                level: true,
                move1: true,
                move2: true,
                move3: true,
                move4: true,
                pokemon_text: '使用可能',
                level_text: '使用可能',
                move1_text: '取得可能',
                move2_text: '取得可能',
                move3_text: '取得可能',
                move4_text: '取得可能',
            }
        );
    });

    test('特別なわざ', () => {
        expect(
            pkClass.checkRegulation(
                '2002-11-21', '2003-11-20', ['ラティオス・ラティアス', '禁止伝説', '幻',],
                'マッスグマ',
                50,
                'じたばた',
                'めざめるパワー',
                'しんそく',
                'はらだいこ',
            )
        ).toEqual(
            {
                pokemon: true,
                level: true,
                move1: true,
                move2: true,
                move3: true,
                move4: true,
                pokemon_text: '使用可能',
                level_text: '使用可能',
                move1_text: '取得可能',
                move2_text: '取得可能',
                move3_text: '取得可能',
                move4_text: '取得可能',
            }
        );
    });

    test('特別なわざとタマゴわざ', () => {
        expect(
            pkClass.checkRegulation(
                '2002-11-21', '2003-11-20', ['ラティオス・ラティアス', '禁止伝説', '幻',],
                'マッスグマ',
                50,
                'じたばた',
                'しんそく',
                'みがわり',
                'はらだいこ',
            )
        ).toEqual(
            {
                pokemon: true,
                level: true,
                move1: true,
                move2: false,
                move3: false,
                move4: true,
                pokemon_text: '使用可能',
                level_text: '使用可能',
                move1_text: '取得可能',
                move2_text: 'タマゴわざと同時に取得不能なわざです',
                move3_text: '特別なわざと同時に取得不能なわざです',
                move4_text: '取得可能',
            }
        );
    });

    test('未解禁わざ', () => {
        expect(
            pkClass.checkRegulation(
                '2002-11-21', '2003-11-20', ['ラティオス・ラティアス', '禁止伝説', '幻',],
                'メタグロス',
                50,
                'コメットパンチ',
                'じしん',
                'いわなだれ',
                'だいばくはつ',
            )
        ).toEqual(
            {
                pokemon: true,
                level: true,
                move1: true,
                move2: true,
                move3: false,
                move4: false,
                pokemon_text: '使用可能',
                level_text: '使用可能',
                move1_text: '取得可能',
                move2_text: '取得可能',
                move3_text: '取得不能なわざです',
                move4_text: '取得不能なわざです',
            }
        );
    });

    test('未解禁わざ', () => {
        expect(
            pkClass.checkRegulation(
                '2002-11-21', '2003-11-20', ['ラティオス・ラティアス', '禁止伝説', '幻',],
                'ライチュウ',
                50,
                'ボルテッカー',
                'きあいパンチ',
                'めざめるパワー',
                'ねがいごと',
            )
        ).toEqual(
            {
                pokemon: true,
                level: true,
                move1: false,
                move2: true,
                move3: true,
                move4: true,
                pokemon_text: '使用可能',
                level_text: '使用可能',
                move1_text: '取得不能なわざです',
                move2_text: '取得可能',
                move3_text: '取得可能',
                move4_text: '取得可能',
            }
        );
    });
});

describe('checkRegulation 後期シングル', () => {
    test('使用不可レベル', () => {
        expect(
            pkClass.checkRegulation(
                '2002-11-21', '2005-08-21', ['禁止伝説', '幻',],
                'バンギラス',
                50,
                'いわなだれ',
                'かみくだく',
                'だいもんじ',
                'れいとうビーム',
            )
        ).toEqual(
            {
                pokemon: true,
                level: false,
                move1: false,
                move2: false,
                move3: false,
                move4: false,
                pokemon_text: '使用可能',
                level_text: '解禁されている最小レベルを下回っています',
                move1_text: '',
                move2_text: '',
                move3_text: '',
                move4_text: '',
            }
        );
    });

    test('オーバーレベル', () => {
        expect(
            pkClass.checkRegulation(
                '2002-11-21', '2005-08-21', ['禁止伝説', '幻',],
                'エーフィ',
                50,
                'サイコキネシス',
                'めいそう',
                'バトンタッチ',
                'あさのひざし',
            )
        ).toEqual(
            {
                pokemon: true,
                level: true,
                move1: true,
                move2: true,
                move3: true,
                move4: false,
                pokemon_text: '使用可能',
                level_text: '使用可能',
                move1_text: '取得可能',
                move2_text: '取得可能',
                move3_text: '取得可能',
                move4_text: 'オーバーレベルのため取得不能なわざです',
            }
        );
    });

    test('オーバーレベル', () => {
        expect(
            pkClass.checkRegulation(
                '2002-11-21', '2005-08-21', ['禁止伝説', '幻',],
                'ルージュラ',
                30,
                'サイコキネシス',
                'ふぶき',
                'あくまのキッス',
                'ほろびのうた',
            )
        ).toEqual(
            {
                pokemon: true,
                level: true,
                move1: true,
                move2: true,
                move3: true,
                move4: false,
                pokemon_text: '使用可能',
                level_text: '使用可能',
                move1_text: '取得可能',
                move2_text: '取得可能',
                move3_text: '取得可能',
                move4_text: '遺伝経路のない取得不能なわざです',
            }
        );
    });

    test('遺伝わざあり', () => {
        expect(
            pkClass.checkRegulation(
                '2002-11-21', '2005-08-21', ['禁止伝説', '幻',],
                'サマヨール',
                50,
                'シャドーボール',
                'いたみわけ',
                'おにび',
                'ねむる',
            )
        ).toEqual(
            {
                pokemon: true,
                level: true,
                move1: true,
                move2: true,
                move3: true,
                move4: true,
                pokemon_text: '使用可能',
                level_text: '使用可能',
                move1_text: '取得可能',
                move2_text: '取得可能',
                move3_text: '取得可能',
                move4_text: '取得可能',
            }
        );
    });

    test('遺伝わざあり', () => {
        expect(
            pkClass.checkRegulation(
                '2002-11-21', '2005-08-21', ['禁止伝説', '幻',],
                'フーディン',
                50,
                'サイコキネシス',
                'ほのおのパンチ',
                'アンコール',
                'じこさいせい',
            )
        ).toEqual(
            {
                pokemon: true,
                level: true,
                move1: true,
                move2: true,
                move3: true,
                move4: true,
                pokemon_text: '使用可能',
                level_text: '使用可能',
                move1_text: '取得可能',
                move2_text: '取得可能',
                move3_text: '取得可能',
                move4_text: '取得可能',
            }
        );
    });

    test('遺伝わざ複数あり ドーブル解禁後', () => {
        expect(
            pkClass.checkRegulation(
                '2002-11-21', '2005-08-21', ['禁止伝説', '幻',],
                'サイドン',
                50,
                'いわなだれ',
                'カウンター',
                'ブレイククロー',
                'のろい',
            )
        ).toEqual(
            {
                pokemon: true,
                level: true,
                move1: true,
                move2: true,
                move3: true,
                move4: true,
                pokemon_text: '使用可能',
                level_text: '使用可能',
                move1_text: '取得可能',
                move2_text: '取得可能',
                move3_text: '取得可能',
                move4_text: '取得可能',
            }
        );
    });

    test('遺伝わざあり ニドラン♂', () => {
        expect(
            pkClass.checkRegulation(
                '2002-11-21', '2005-08-21', ['禁止伝説', '幻',],
                'ニドキング',
                30,
                'じしん',
                'ねんりき',
                'ふくろだたき',
                'つのドリル',
            )
        ).toEqual(
            {
                pokemon: true,
                level: true,
                move1: true,
                move2: true,
                move3: true,
                move4: false,
                pokemon_text: '使用可能',
                level_text: '使用可能',
                move1_text: '取得可能',
                move2_text: '取得可能',
                move3_text: '取得可能',
                move4_text: 'オーバーレベルのため取得不能なわざです',
            }
        );
    });

    test('遺伝わざあり ニドラン♀', () => {
        expect(
            pkClass.checkRegulation(
                '2002-11-21', '2005-08-21', ['禁止伝説', '幻',],
                'ニドクイン',
                30,
                'じしん',
                'あまえる',
                'ふくろだたき',
                'かみくだく',
            )
        ).toEqual(
            {
                pokemon: true,
                level: true,
                move1: true,
                move2: true,
                move3: true,
                move4: true,
                pokemon_text: '使用可能',
                level_text: '使用可能',
                move1_text: '取得可能',
                move2_text: '取得可能',
                move3_text: '取得可能',
                move4_text: '取得可能',
            }
        );
    });

    test('教えわざ', () => {
        expect(
            pkClass.checkRegulation(
                '2002-11-21', '2005-08-21', ['禁止伝説', '幻',],
                'カビゴン',
                50,
                'おんがえし',
                'じわれ',
                'じばく',
                'カウンター',
            )
        ).toEqual(
            {
                pokemon: true,
                level: true,
                move1: true,
                move2: true,
                move3: true,
                move4: true,
                pokemon_text: '使用可能',
                level_text: '使用可能',
                move1_text: '取得可能',
                move2_text: '取得可能',
                move3_text: '取得可能',
                move4_text: '取得可能',
            }
        );
    });

    test('教えわざ', () => {
        expect(
            pkClass.checkRegulation(
                '2002-11-21', '2005-08-21', ['禁止伝説', '幻',],
                'メタグロス',
                50,
                'コメットパンチ',
                'じしん',
                'ばくれつパンチ',
                'だいばくはつ',
            )
        ).toEqual(
            {
                pokemon: true,
                level: true,
                move1: true,
                move2: true,
                move3: true,
                move4: true,
                pokemon_text: '使用可能',
                level_text: '使用可能',
                move1_text: '取得可能',
                move2_text: '取得可能',
                move3_text: '取得可能',
                move4_text: '取得可能',
            }
        );
    });

    test('リライブわざ', () => {
        expect(
            pkClass.checkRegulation(
                '2002-11-21', '2005-08-21', ['禁止伝説', '幻',],
                'サンダー',
                50,
                '１０まんボルト',
                'じんつうりき',
                'ドリルくちばし',
                'きんぞくおん',
            )
        ).toEqual(
            {
                pokemon: true,
                level: true,
                move1: true,
                move2: true,
                move3: true,
                move4: true,
                pokemon_text: '使用可能',
                level_text: '使用可能',
                move1_text: '取得可能',
                move2_text: '取得可能',
                move3_text: '取得可能',
                move4_text: '取得可能',
            }
        );
    });

    test('リライブわざとタマゴわざ', () => {
        expect(
            pkClass.checkRegulation(
                '2002-11-21', '2005-08-21', ['禁止伝説', '幻',],
                'バリヤード',
                50,
                'サイコキネシス',
                'ものまね',
                'このゆびとまれ',
                'ねこだまし',
            )
        ).toEqual(
            {
                pokemon: true,
                level: true,
                move1: true,
                move2: true,
                move3: false,
                move4: false,
                pokemon_text: '使用可能',
                level_text: '使用可能',
                move1_text: '取得可能',
                move2_text: '取得可能',
                move3_text: 'タマゴわざと同時に取得不能なわざです',
                move4_text: 'リライブわざと同時に取得不能なわざです',
            }
        );
    });

    test('特別なわざ', () => {
        expect(
            pkClass.checkRegulation(
                '2002-11-21', '2005-08-21', ['禁止伝説', '幻',],
                'ハピナス',
                50,
                'ちきゅうなげ',
                'ねがいごと',
                'あまいかおり',
                'タマゴうみ',
            )
        ).toEqual(
            {
                pokemon: true,
                level: true,
                move1: true,
                move2: true,
                move3: true,
                move4: true,
                pokemon_text: '使用可能',
                level_text: '使用可能',
                move1_text: '取得可能',
                move2_text: '取得可能',
                move3_text: '取得可能',
                move4_text: '取得可能',
            }
        );
    });
});

