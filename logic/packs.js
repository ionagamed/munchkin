/**
 * Created by ionagamed on 8/13/16.
 */

var packs = {
    pack1: {
        doors: [
            'gelatinous_octahedron',//
            'ghoulfiends',//HARD
            'harpies',//
            'hippogriff',//*
            'insurance_salesman',//*
            '3872_orcs',//
            'amazon',//
            'bigfoot',//
            'bullrog',//
            'crabs',//
            'curse_lose_small_item_1',//*
            'curse_lose_small_item_2',//*
            'curse_lose_armor',//
            'curse_lose_footgear',//
            'curse_lose_headgear',//
            'wizard_1',//*
            'curse_change_class',//
            'curse_change_race',//
            'curse_change_sex',
            'curse_chicken',//
            'halfling_1',
            'halfling_2',
            'thief_1',
            'thief_2',
            'thief_3',
            'half-breed_1',
            'help_me_out_here',
            'illusion',
            'mate',//
            'out_to_lunch',//
            'squidzilla',//
            'stoned_golem',//*
            'tongue_demon',//*
            'undead_horse',//
            'horror',//
            'ancient',
            'baby',
            'enraged',
            'humongous',
            'intelligent',
            'maul_rat',//
            'mr_bones',//
            'net_troll',//*
            'pit_bull',//*
            'platycore',//*
            'cleric_1',
            'cleric_2',
            'cleric_3',
            'dwarf_1',
            'dwarf_2',
            'plutonium_dragon',//
            'potted_plant',//
            'pukachu',//
            'shrieking_geek',//
            'snails_on_speed',//*
            'dwarf_3',
            'elf_1',
            'elf_2',    
            'elf_3',
            'halfling_3',
            'king_tut',//
            'lame_goblin',//
            'large_angry_chicken',//
            'lawyers',//*
            'leperchaun',//*
            'drooling_slime',//
            'face_sucker',//
            'floating_nose',
            'flying_frogs',//
            'gazebo',//TODO: button off
            'curse_lose_two_cards',//*
            'curse_lose_class',//*
            'curse_lose_race',//
            'curse_malign_mirror',
            'truly_obnoxious_curse',//
            'curse_duck_of_doom',//
            'curse_income_tax',
            'curse_lose_big_item',//*   
            'curse_lose_level_1',//
            'curse_lose_level_2',//
            'warrior_1',//
            'warrior_2',//
            'warrior_3',//
            'wizard_2',//
            'wizard_3',//
            'super_munchkin_1',//
            'super_munchkin_2',//
            'wandering_monster_1',
            'wandering_monster_2',
            'wandering_monster_3',
            'wannabe_vampire',
            'wight_brothers',//
            'cheat',
            'divine_intervention',
            'half-breed_2'//
        ],
        treasure: [
            'magic_lamp',
            'pollymorph_potion',
            'transferral_potion',
            'wand_of_dowsing',
            'wishing_ring',
            'spiky_knees',
            'staff_of_napalm',
            'stepladder',
            'swiss_army_polearm',
            'doppleganger',
            'flaming_armor',
            'gentlemans_club',
            'hammer_of_kneecapping',
            'helm of courage',
            'horny_helmet',
            'bad-ass_bandanna',
            'boots_of_butt-kicking',
            'bow_with_ribbons',
            'broad_sword',
            'buckler_of_swashing',
            'cotion_of_ponfusion',
            'acid_potion',
            'flaming_poison_potion',
            'freezing_explosive_potion',
            'magic_missile',
            'pantyhose_of_giant_strength',
            'pointy_hat_of_power',
            'rapier_of_unfairness',
            'rat_on_a_stick',
            'really_impressive_title',
            '1000_gold',
            'boil_an_anthill',
            'bribe_gm_with_food',
            'convenient_addition_error',
            'invoke_obscure_rules',
            'wishing_ring',
            'boots_of_running_really_fast',
            'hireling',
            'hoard',
            'kneepads_of_allure',
            'flask_of_glue',
            'friendship_potion',
            'instant_wall',
            'invisibility_potion',
            'loaded_die_1',
            'huge_rock',
            'leather_armor',
            'sandwich',
            'mace_of_sharpiness',
            'mithril_armor',
            'chainsaw',
            'cheese_grater_of_piece',
            'cloak_of_obscurity',
            'dagger_of_treachery',
            'eleven-foot_pole',
            'nasty-tasting_sports_drink',
            'potion_of_halitosis',
            'potion_of_idiotic_bravery',
            'pretty_balloons',
            'sleep_potion',
            'shield_of_ubiquity',
            'short_wide_armor',
            'singing_and_dancing_sword',
            'slimy_armor',
            'sneaky_bastard_sword',
            'kill_the_hireling',
            'mutilate_the_bodies',
            'potion_of_general_studliness',
            'whine_at_the_gm',
            'yuppie_water',
            'go_up_a_level',
            'steal_a_level',
            'tuba_of_charm',
            'sandals_of_protection',
            'q-dice'
        ]
    }
};

for (let idx in packs.pack1.doors) {
    // TODO: bad solution
    let i = packs.pack1.doors[idx];
    let cp = idx;
    if (i.substring(i.length - 2, i.length - 1) == '_')
        i = i.substring(0, i.length - 2);
    try {
        require('./packs/pack1/doors/' + i);
    } catch (e) {
        packs.pack1.doors[cp] = 'AaA_' + packs.pack1.doors[cp];
    }
}
for (let idx in packs.pack1.treasure) {
    // TODO: bad solution
    let i = packs.pack1.treasure[idx];
    let cp = idx;
    if (i.substring(i.length - 2, i.length - 1) == '_')
        i = i.substring(0, i.length - 2);
    try {
        require('./packs/pack1/treasure/' + i);
    } catch (e) {
        packs.pack1.treasure[cp] = 'AaA_' + packs.pack1.treasure[cp];
    }
}

export default packs;
