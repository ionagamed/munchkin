/**
 * Created by ionagamed on 8/25/16.
 */

const translationMapping = {
    'gelatinous_octahedron': 'Желатиновый Октаэдр',
    'ghoulfiends': 'Мадемонуазели',
    'harpies': 'Гарпистки',
    'hippogriff': 'Гиппогриф',
    'insurance_salesman': 'Страховой Агент',
    '3872_orcs': '3872 орка',
    'amazon': 'Амазонка',
    'bigfoot': 'bigfoot',
    'bullrog': 'Бульрог',
    'crabs': 'Типа Вошки',
    'curse_lose_small_item': 'Невелика Потеря',
    'curse_lose_armor': 'Теряешь Надетый Броник',
    'curse_lose_footgear': 'Теряешь Надетую Обувку',
    'curse_lose_headgear': 'Теряешь Надетый Головняк',
    'wizard': 'Волшебник',
    'curse_change_class': 'Смена Класса',
    'curse_change_race': 'Смена Расы',
    'curse_change_sex': 'Смена Пола',
    'curse_chicken': 'Курица На Башне',
    'halfling': 'Халфлинг',
    'thief': 'Вор',
    'half-breed': 'Полукровка',
    'help_me_out_here': 'Помоги Себе Сам!',
    'illusion': 'Иллюзия',
    'mate': 'Гадкая Парочка',
    'out_to_lunch': 'Ушел На Обед',
    'squidzilla': 'Кальмадзилла',
    'stoned_golem': 'Обдолбанный Голем',
    'tongue_demon': 'Языческий Демон',
    'undead_horse': 'Андедный Коник',
    'horror': 'Невыразимо Жуткий Неописуемый Ужас',
    'ancient': 'Древний',
    'baby': 'Детеныш',
    'enraged': 'Психованный',
    'humongous': 'Амбал',
    'intelligent': 'Мозговитый',
    'maul_rat': 'Молотая Крысотка',
    'mr_bones': 'Г-н Кости',
    'net_troll': 'Форумный Тролль',
    'pit_bull': 'Питбуль',
    'platycore': 'Утикора',
    'cleric': 'Клирик',
    'dwarf': 'Дварф',
    'plutonium_dragon': 'Плутониевый Дракон',
    'potted_plant': 'Трава В Горшке',
    'pukachu': 'Рыгачу',
    'shrieking_geek': 'Вопящий Задрот',
    'snails_on_speed': 'Ускоренные Улитки',
    'elf': 'Эльф',
    'king_tut': 'Король Тут',
    'lame_goblin': 'Увечный Гоблин',
    'large_angry_chicken': 'Здоровенная Бешенная Цыпа',
    'lawyers': 'Адвокат',
    'leperchaun': 'Лепрокон',
    'drooling_slime': 'Сочащаяся Слизь',
    'face_sucker': 'Лицесос',
    'floating_nose': 'Сопливый Нос',
    'flying_frogs': 'Летучие Лягушки',
    'gazebo': 'Газебо',
    'curse_lose_two_cards': 'Теряешь 2 Карты',
    'curse_lose_class': 'Теряешь Класс',
    'curse_lose_race': 'Теряешь Расу',
    'curse_malign_mirror': 'Кривящее Зеркало',
    'truly_obnoxious_curse': 'В Конец Мерзкое Проклятие',
    'curse_duck_of_doom': 'Утка Обреченности',
    'curse_income_tax': 'Налоги',
    'curse_lose_big_item': 'Большая Потеря',
    'curse_lose_level': 'Теряешь 1 Уровень!',
    'warrior': 'Воин',
    'super_munchkin': 'Суперманчкин',
    'wandering_monster': 'Бродячая Тварь',
    'wannabe_vampire': 'Закос Под Вампира',
    'wight_brothers': 'Бледные Братья',
    'cheat': 'Чит!',
    'divine_intervention': 'Божественное Вмешательство',
    
    'male': 'мужской',
    'female': 'женский',
};

export default function (x) {
    if (!x) return x;
    if (x.substring(x.length - 2, x.length - 1) == '_') {
        x = x.substring(0, x.length - 2);
    }
    if (translationMapping.hasOwnProperty(x)) {
        return translationMapping[x];
    } else {
        return x;
    }
}
