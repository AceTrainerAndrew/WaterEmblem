/**
 *  main.js
 *  -----
 *  Contains the core logic for the game.
 */


//##############################################################################
//# Global variables                                                           #
//##############################################################################
// Game variables
//   Variables stored and handled by the game logic and necessary for the game
//   to function properly.
ig.global.gameState = null;
ig.global.tilesize = 32;
//ig.global.game_pos = {map: null, x: null, y: null};
ig.global.encounter = {zone: 0, spawn_min: 1, spawn_max: 1};
ig.global.party = [];

// User variables
//   Variables used to store and handle user's gameplay.
ig.global.main_player_name = 'You';
ig.global.currentLevel = 0;
ig.global.objective_triggered = false;
ig.global.gold = 9000;


//##############################################################################
//# The game                                                                   #
//##############################################################################
ig.module(
    'game.main'
)
.requires(
    // ImpactJS Core
    'impact.game',
    'impact.font',
    //'impact.debug.debug', // <-- DEVELOPMENT DEBUG ONLY

    // PC and NPC grid sprites
    // 'game.entities.players.advancedHero',
    // 'game.entities.players.arch_sage',
    // 'game.entities.players.archer',
    // 'game.entities.players.cavalier',
    // 'game.entities.players.dark_druid',
    // 'game.entities.players.fighter',
    // 'game.entities.players.general',
    // 'game.entities.players.knight',
    // 'game.entities.players.knight_lord',
    // 'game.entities.players.lord',
    // 'game.entities.players.mercenary',
    // 'game.entities.players.monk',
    // 'game.entities.players.myridon',
    // 'game.entities.players.paladin',
    // 'game.entities.players.pegasus_knight',
    // 'game.entities.players.pirate',
    // 'game.entities.players.sniper',
    // 'game.entities.players.thief',
    // 'game.entities.players.troubadour',
    // 'game.entities.players.valkyrie',
    // 'game.entities.players.warrior',
    //'game.entities.players.female_mage',
    'game.entities.players.hero', // Main character
    'game.entities.players.female_sage',
    'game.entities.players.wyvern_lord',
    'game.entities.players.sword_master',
    'game.entities.players.wyvern_lord',

    // PC and NPC battle animations
    'game.entities.animations.dracozombie_battleanim',
    'game.entities.animations.enemy_sage_battleanim',
    'game.entities.animations.hero_battleanim', // Main character
    'game.entities.animations.king_battleanim',
    'game.entities.animations.wyvernLord_battleanim',
    'game.entities.animations.sage_battleanim',
    'game.entities.animations.swordmaster_battleanim',
    'game.entities.animations.wyvernLord_battleanim',
    'game.entities.animations.enemy_thief_battleanim',
    'game.entities.animations.enemy_wyvernLord_battleanim',
    'game.entities.animations.enemy_warrior_battleanim',
    'game.entities.animations.enemy_mage_battleanim',
    'game.entities.animations.enemy_fighter_battleanim',
    'game.entities.animations.enemy_knight_battleanim',
    'game.entities.animations.enemy_general_battleanim',
    'game.entities.animations.enemy_mercenary_battleanim',
    'game.entities.animations.enemy_paladin_battleanim',
    'game.entities.animations.enemy_pegasus_knight_battleanim',
    'game.entities.animations.enemy_swordmaster_battleanim',
    'game.entities.animations.enemy_knight_lord_battleanim',
    'game.entities.animations.enemy_lyn_battleanim',
    'game.entities.animations.enemy_hector_battleanim',
    'game.entities.animations.enemy_nergal_battleanim',
    // 'game.entities.animations.cavalier_battleanim',
    // 'game.entities.animations.mage_battleanim',
    // 'game.entities.animations.advancedHero_battleanim',
    // 'game.entities.animations.archer_battleanim',
    // 'game.entities.animations.enemy_archer_battleanim',
    // 'game.entities.animations.enemy_assassin_battleanim',
    'game.entities.animations.enemy_lord_battleanim',
    // 'game.entities.animations.enemy_monk_battleanim',
    // 'game.entities.animations.enemy_sniper_battleanim',
    // 'game.entities.animations.enemy_advancedHero_battleanim',
    // 'game.entities.animations.fighter_battleanim',
    // 'game.entities.animations.general_battleanim',
    // 'game.entities.animations.knight_battleanim',
    // 'game.entities.animations.knight_lord_battleanim',
    // 'game.entities.animations.lord_battleanim',
    // 'game.entities.animations.mage_battleanim',
    // 'game.entities.animations.mercenary_battleanim',
    // 'game.entities.animations.monk_battleanim',
    // 'game.entities.animations.paladin_battleanim',
    // 'game.entities.animations.pegasus_knight_battleanim',
    // 'game.entities.animations.sniper_battleanim',
    // 'game.entities.animations.thief_battleanim',
    // 'game.entities.animations.warrior_battleanim',

    // Generators and Objects
    'game.entities.misc.enemy_spawner', // Random enemy spawner entity
    'game.entities.misc.party_spawner', // Party spawner placeholder entity
    'game.entities.misc.pointer', // Mouse cursor entity

    // Overlays and layer controllers
    'game.entities.overlays.overlay_startscreen', // Start screen overlay
    'game.entities.overlays.credits_roll', // Credits screen content
    'game.entities.overlays.battle_anim_gui', // Battle animation data display layer
    'game.entities.overlays.battle_anim_effects', // Battle animation effects layer controller
    'game.entities.overlays.battle_anim_background', // Battle animation background layer controller
    'game.entities.overlays.overlay_dialog', // Dialog modal spawner
    'game.entities.overlays.overlay_shop', // Shop background overlay

    // Menu buttons
    'game.entities.menus.button_startscreen_newgame',
    //'game.entities.menus.button_startscreen_continue',
    'game.entities.menus.button_startscreen_settings',
    'game.entities.menus.button_startscreen_credits',
    'game.entities.menus.button_settings_vol_down',
    'game.entities.menus.button_settings_vol_up',
    'game.entities.menus.button_settings_return',
    'game.entities.menus.button_trade_item_active',
    'game.entities.menus.button_trade_item_target',
    'game.entities.menus.button_inventory',
    'game.entities.menus.button_inventory_item',
    'game.entities.menus.button_dropped_item',
    'game.entities.menus.button_endturn',
    //'game.entities.menus.button_suspend',
    'game.entities.menus.button_shop_item',
    'game.entities.menus.button_shop_buy',
    'game.entities.menus.button_shop_sell',
    'game.entities.menus.button_shop_exit',
    'game.entities.menus.button_seize',
    'game.entities.menus.button_transparent',
    'game.entities.menus.button_shop_confirm_sell',
    'game.entities.menus.button_shop_deny_sell',
    'game.entities.menus.button_shop_confirm_buy',
    'game.entities.menus.button_shop_deny_buy',

    // Levels/Maps
    'game.levels.big_castle',
    'game.levels.chapter1',
    'game.levels.chapter2',
    'game.levels.chapter3',
    'game.levels.chapter4',

    // Catalogs
    'game.catalogs.item_catalog', // Item catalog
    'game.catalogs.objective_catalog', // Objective catalog
    //'game.catalogs.script_catalog', // Script catalog
    'game.catalogs.dialog_catalog', // Dialog catalog

    // Plugins
    'plugins.astar.astar-for-entities', // A* search algorithm for pathfinding
    //'plugins.astar.astar-for-entities-debug', // <-- DEVELOPMENT DEBUG ONLY
    'plugins.atmosphere.atmosphere',
    //'plugins.atmosphere.atmosphere-debug',  // <-- DEVELOPMENT DEBUG ONLY
    'plugins.camera.camera', // Game screen camera
    'plugins.director.director', // Level transition abstraction
    'plugins.font-sugar.font', // Font customization
    'plugins.impact-storage.impact-storage', // HTML5 local storage
    'plugins.screen-fader.screen-fader' // Screen fade transition effect
)
.defines(function() {
    // Enable ECMAScript 5 (JavaScript 1.8.5) Strict Mode
    //   http://developer.mozilla.org/en/JavaScript/Strict_mode
    //   http://impactjs.com/blog/2012/05/impact-1-20
    'use strict';

    /**
     *  ig.BaseGame
     *  -----
     *  Contains the shared properties and actions from which the core game
     *  states are derived from.
     */
    ig.BaseGame = ig.Game.extend({
        font30: {
            default: new ig.Font('media/fonts/04b03_30.font.png', { fontColor: '#ECEEA1', borderColor: '#404040' }),
            green:   new ig.Font('media/fonts/04b03_20.font.png', { fontColor: '#3CDC3C', borderColor: '#404040' }),
            red:     new ig.Font('media/fonts/04b03_20.font.png', { fontColor: '#DC3C3C', borderColor: '#404040' }),
            black:   new ig.Font('media/fonts/04b03_20.font.png', { fontColor: '#000000', letterSpacing: -1 })
        },

        font20: {
            default: new ig.Font('media/fonts/04b03_20.font.png', { fontColor: '#ECEEA1', borderColor: '#404040' }),
            green:   new ig.Font('media/fonts/04b03_20.font.png', { fontColor: '#3CDC3C', borderColor: '#404040' }),
            red:     new ig.Font('media/fonts/04b03_20.font.png', { fontColor: '#DC3C3C', borderColor: '#404040' }),
            black:   new ig.Font('media/fonts/04b03_20.font.png', { fontColor: '#000000', letterSpacing: -1 })
        },

        font16: {
            default: new ig.Font('media/fonts/04b03_16.font.png', { fontColor: '#ECEEA1', borderColor: '#404040' }),
            green:   new ig.Font('media/fonts/04b03_16.font.png', { fontColor: '#3CDC3C', borderColor: '#404040' }),
            red:     new ig.Font('media/fonts/04b03_16.font.png', { fontColor: '#DC3C3C', borderColor: '#404040' }),
            black:   new ig.Font('media/fonts/04b03_16.font.png', { fontColor: '#000000', letterSpacing: -1 })
        },

        font12: {
            default: new ig.Font('media/fonts/04b03_12.font.png', { fontColor: '#ECEEA1', borderColor: '#404040' }),
            green:   new ig.Font('media/fonts/04b03_12.font.png', { fontColor: '#3CDC3C', borderColor: '#404040' }),
            red:     new ig.Font('media/fonts/04b03_12.font.png', { fontColor: '#DC3C3C', borderColor: '#404040' }),
            black:   new ig.Font('media/fonts/04b03_12.font.png', { fontColor: '#000000', letterSpacing: -1 })
        },
        fontContent20: new ig.Font('media/fonts/verdana_20.font.png',  { fontColor: '#E5E5E5' }),

        tradeMenu:          new ig.Image('media/gui/tradeMenu.png'           ),
        equipMenu:          new ig.Image('media/gui/equipMenu.png'           ),
        statScreen:         new ig.Image('media/gui/statscreen.png'          ),
        hpModal:            new ig.Image('media/gui/hpModal.png'             ),
        terrainModal:       new ig.Image('media/gui/terrainModal.png'        ),
        weaponModal:        new ig.Image('media/gui/weapon_bonus_modal.png'  ),
        battleSummaryModal: new ig.Image('media/gui/battle_summary_modal.png'),
        playerPhaseModal:   new ig.Image('media/gui/player_phase.png'        ),
        enemyPhaseModal:    new ig.Image('media/gui/enemy_phase.png'         ),
        helpDialogue:       new ig.Image('media/gui/help_dialogue.png'       ),
        levelUpModal:       new ig.Image('media/gui/levelupstats.png'        ),
        levelUpMessage:     new ig.Image('media/gui/levelup.png'             ),
        levelUpTop:         new ig.Image('media/gui/leveluptop.png'          ),
        levelUpBonus:       new ig.Image('media/gui/bonus.png'               ),
        expModal:           new ig.Image('media/gui/exp_modal.png'           ),
        objectiveModal:     new ig.Image('media/gui/objective.png'           ),
        itemDisplayModal:   new ig.Image('media/gui/itemDisplayModal.png'    ),
        discardDialogue:    new ig.Image('media/gui/discardDialogue.png'     ),

        // ig.music is the primary music track for map music
        auxMusic: null, // Axillary music track for auxiliary/overlay music (do not put sound effects in here)

        init: function() {
            // Bind keys to game actions
            ig.input.bind(ig.KEY.MOUSE1,     'leftClick' ); // Left Mouse Button: select option, interact with object/character, continue dialogue, etc.
            ig.input.bind(ig.KEY.MOUSE2,     'rightClick'); // Right Mouse Button: Display the game menu
            ig.input.bind(ig.KEY.UP_ARROW,   'up'        ); // Up Arrow: move player or navigation up
            ig.input.bind(ig.KEY.DOWN_ARROW, 'down'      ); // Down Arrow: move player or nagivation down
            ig.input.bind(ig.KEY.ESC,        'escape'    ); // Escape: cancel option/selection, undo, etc.
            ig.input.bind(ig.KEY.ENTER,      'menu'      ); // Enter: Opens up a "menu" on click. Only Temporary for testing.
            ig.input.bind(ig.KEY.SHIFT,      'SHIFT'     ); // Left/Right Shift

            // Load and configure background music
            ig.music.add('media/sounds/bgm/czhang/FireEmblem_-_Companions_CZ_Rearrange.*', 'companions'); // "Companions" by Christopher Zhang
            ig.music.add('media/sounds/bgm/awakening.*',           'credits'            ); // "Awakening" by CrispyYoshi
            ig.music.add('media/sounds/bgm/inescapeable_fate.*',   'inescapeable_fate'  ); // "Inescapable Fate" by Gamma V
            ig.music.add('media/sounds/bgm/winds_across_plains.*', 'winds_across_plains'); // "Winds Across Plains" by AxemJinx
            ig.music.add('media/sounds/bgm/landofpromise.*',       'land_of_promise'    ); // "Land of Promise" by 0rangaStang
            ig.music.add('media/sounds/bgm/lightanddarkness.*',    'light_and_darkness' ); // "Light and Darkness" by Gamma V
            ig.music.add('media/sounds/bgm/rise_above.*',          'rise_above'         ); // "Rise Above" by Jimmy52905
            ig.music.add('media/sounds/bgm/enemyphase.*',          'augustine_army'     ); // "Augustine Army" by Gamma V


            this.auxMusic = new ig.Music();
            this.auxMusic.add('media/sounds/bgm/battle.*',                   'battle'        ); // "Strange Encounter" by AxemJinx
            this.auxMusic.add('media/sounds/bgm/battle_for_whose_sake.*',    'zephiel_battle'); // "Battle for Whose Sake" by CrispyYoshi
            this.auxMusic.add('media/sounds/bgm/everything_into_the_dark.*', 'nergal_battle' ); // "Everything Into the Dark" by Jimmy52905
            this.auxMusic.add('media/sounds/bgm/rise_to_the_challenge.*',    'boss_theme'    ); // "Rise To the Challenge" by swordjosh7

            this.sfx = new ig.Music();
            this.sfx.add('media/sounds/sfx/experiencebar.*', 'exp'      );
            this.sfx.add('media/sounds/sfx/hit.*',           'hit'      );
            this.sfx.add('media/sounds/sfx/attackmiss.*',    'miss'     );
            this.sfx.add('media/sounds/sfx/crit.*',          'crit'     );
            this.sfx.add('media/sounds/sfx/death.*',         'death'    );
            this.sfx.add('media/sounds/sfx/nextturn.*',      'next_turn');
            this.sfx.add('media/sounds/sfx/levelup.*',       'level_up' );
            this.sfx.add('media/sounds/sfx/trimmedselect.*', 'click'    );
            this.sfx.add('media/sounds/sfx/money.*',         'money'    );
            this.sfx.add('media/sounds/sfx/getitem.*',       'get_item' );

            ig.music.volume = this.auxMusic.volume = 0.3;
            this.sfx.volume = 0.9;

            ig.music.loop = this.auxMusic.loop = true;
            this.sfx.loop = false; // Do not loop sound effects (it gets annoying very fast...)
        } // End init method
    }); // End ig.BaseGame

    /**
     * ig.BattleMode
     * -----
     * Displays the battlefield with a top-down persoective centered on the
     * current active unit. The player's party, enemy's party/units, and
     * assistive or neutral party/units take turns on the battlefield.
     *
     * The player leaves battle mode and back onto the main game under the
     * condition where either:
     *   1. All or specific enemies are defeated.
     *   2. Every member in the player's party is defeated.
     *   3. Some special condition is triggered (i.e., after a certain number of
     *      turns has elapsed, or the health of a specific unit reached below a
     *      certain amount, etc.).
     */
    ig.BattleMode = ig.BaseGame.extend({
        // Mouse pointer properties
        pointer: null, // Pointer entity
        clickedUnit: null, // Unit the cursor clicked (selected)
        hoveredUnit: null, // Unit the cursor is hovered over
        hoveredTerrain: null, // Index of terrain the cursor is hovered over
        tempUnit: null,

        // Shop properties
        boughtItem: false, // Did we buy an item?
        boughtItemName: null, // What is the item we bought?
        soldItem: false, // Did we sell an item?
        soldItemName: null, // What is the item we sold?
        confirmSell: false, // Used for handling text display when waiting for user to press yes/no on sell screen
        confirmBuy: false,  // Used for handling text display when waiting for user to press yes/no on buy screen
        lowMoney: false, // Can we not afford an item? Used to display the proper text when buying an item we can't afford
        fullInventory: false, // Do we have a full inventory? Used to display the proper text when buying an item with full inventory
        buySellConfirmed: false, // Used for hiding/displaying the buy/sell/exit button until enough time has passed

        // Sound effects controllers
        playingTurnSFX: false,
        playingLevelUpSFX: false,
        playingGetItemSFX: false,

        // Unit statistics
        numPlayers: 0,
        numEnemies: 0,

        // Camera properties
        camera: null, // Camera plugin
        freeCamera: true, // Cursor-focus/Unit-focus camera toggle
        screenshakeIntensity: 0, // Intensity of screen shaking

        // Battlefield properties
        turn_counter: 1, // Current turn counter
        battleState: null, // null: default
                           // 'assist': selecting friendly unit to assist (heal, item, etc.)
                           // 'attack': selecting unit to attack
                           // 'battle_prepare': in battle animation, preparing units
                           // 'battle_start': in battle animation, running battle sequence
                           // 'battle_transition': transitioning in to or out of battle animation
                           // 'enemy_phase': displaying enemy phase modal
                           // 'exp': displaying unit experience gain modal
                           // 'levelup': displaying unit level up modal
                           // 'player_phase': displaying player phase modal
                           // 'stats': viewing selected unit stat screen
                           // 'trade': selecting friendly unit to trade
                           // 'trading': trading with friendly unit in progress
                           // 'item_display': did we show the player what item they received?
                           // 'discarding': is the player currently discarding?
                           // 'inventory': is the player currently viewing their inventory?
        displayedPlayerPhaseModal: false, // Was player phase modal displayed?
        displayedEnemyPhaseModal: false, // Was enemy phase modal displayed?
        units: [], // All units participating on battlefield
        activeUnit: 0, // Controlling unit
        exp_time: 1,
        unitStats: [],

        // Battle animation properties
        battleAnimControllers: {gui: null, effects: null, background: null},
        attackDistance: 0, // Distance from target unit to attacking unit
        attackTargets: [], // All units possible to be targeted for attacking
        assistTargets: [], // All units possible to be targeted for assisting
        tradeTargets: [], // All units possible to be targeted for trading
        targetedUnit: null, // Unit targeted on receiving end of action
        attackQueue: [], // Active unit and target unit attack queue
        attackQueueIndex: 0, // Current attack stage (index) of attack queue
        battleAnimStats: {activeUnit: null, targetedUnit: null},

        selectedShopItemIndex: null,

        // Field terrains via tile index number
        //   http://impactjs.com/forums/help/get-tile-index-number-from-main-layer-tileset/page/1
        terrain: {
            1: {type: 'Plain',    move: 1, def: 0, avoid:  0            },
            2: {type: 'Fortress', move: 1, def: 2, avoid: 20, hp_rec: 10},
            3: {type: 'Forest',   move: 2, def: 1, avoid: 20            },
            4: {type: 'Mountain', move: 3, def: 1, avoid: 40            },
            5: {type: 'Sand',     move: 2, def: 0, avoid: 10            },
            6: {type: 'Armory',   move: 0, def: 1, avoid: 10            },
            7: {type: 'Shop',     move: 0, def: 1, avoid: 10            },
            8: {type: 'Castle',   move: 0, def: 0, avoid:  0            },
            9: {type: 'Snow',     move: 0, def: 0, avoid: 10            },
            10:{type: 'Throne',   move: 0, def: 2, avoid: 20            },
            11:{type: 'S. Forest',move: 2, def: 1, avoid: 20            }
        },

        // Set up Impact Atmospheric System
        atmosphere: new ig.Atmosphere(),

        // Set up item catalog
        itemCatalog: new ig.global.ItemCatalog(),

        // Temporary variables for enemy dropped items
        item_drop: null,
        item_drop_uses: null,
        itemDropObject: null, // Hold object of item that player receives
        displayedItem: false, // Did we show the player what item they received?

        // Set up objective catalog
        objectiveCatalog: new ig.global.ObjectiveCatalog(),

        // Set up script catalog
        //scriptCatalog: new ig.global.ScriptCatalog(),

        // Set up ImpactStorage
        storage: new ig.Storage(),

        init: function() {
            this.parent();

            // Set up camera
            this.camera = new ig.Camera(ig.system.width / 3, ig.system.height / 3, 5);
            this.camera.trap.size = {x: ig.system.width / 3, y: ig.system.height / 3};

            // Load map
            this.levels = [
                {
                    data: ig.global.LevelChapter1,
                    objective: this.objectiveCatalog.defeatAllEnemies,
                    objectiveArgs: [],
                    music: 'rise_above',
                    description: 'DefeatEnemies',
                    atmosphere: {
                        weather_condition: {
                            fog: false,
                            lightning: false,
                            rain: false,
                            snow: false
                        }
                    }
                },
                {
                    data: ig.global.LevelChapter4,
                    objective: this.objectiveCatalog.seizeTile,
                    objectiveArgs: [],
                    music: 'light_and_darkness',
                    description: 'Seize',
                    atmosphere: {
                        weather_condition: {
                            fog: false,
                            lightning: false,
                            rain: false,
                            snow: false
                        }
                    }
                },
                {
                    data: ig.global.LevelChapter2,
                    objective: this.objectiveCatalog.defeatAllEnemies,
                    objectiveArgs: [3],
                    music: 'companions',
                    description: 'DefeatEnemies',
                    atmosphere: {
                        weather_condition: {
                            fog: false,
                            lightning: false,
                            rain: true, // It's raining, it's pouring, ...
                            snow: false
                        }
                    }
                },
            ];
            this.director = new ig.Director(this, this.levels);
            this.director.jumpTo(this.levels[ig.global.currentLevel].data);

            // Play background music
            ig.music.play(this.levels[ig.global.currentLevel].music);

            // Configure settings for the atmosphere
            var atmosphereSettings = Object.keys(this.levels[ig.global.currentLevel].atmosphere);
            for(var s = 0; s < atmosphereSettings.length; s++) {
                this.atmosphere[atmosphereSettings[s]] = this.levels[ig.global.currentLevel].atmosphere[atmosphereSettings[s]];
            }

            // Set up cursor
            this.pointer = this.spawnEntity(ig.global.EntityPointer, 0, 0);

            // Initialize timers
            this.atkAnimTimer = new ig.Timer();
            this.phaseTimer = new ig.Timer(1.5);
            this.enemyPhaseTimer = new ig.Timer(1.5);
            this.levelUpTimer = new ig.Timer(7); // This timer controls the entire level up state
            this.levelUpMessageTimer = new ig.Timer(1.5); // How long to display "Level up!"
            this.levelUpModalTimer = new ig.Timer(1.5); // How long to display level up modal
            this.levelUpBonusTimer = new ig.Timer(1.0); // How long between displaying each +1 bonus
            this.expTimer = new ig.Timer(this.exp_time);
            this.boughtItemTimer = new ig.Timer(1.5);
            this.soldItemTimer = new ig.Timer(1.5);
            this.lowMoneyTimer = new ig.Timer(1.5);
            this.fullInventoryTimer = new ig.Timer(1.5);
            this.displayedItemTimer = new ig.Timer(1.5);

            this.screenFadeOut = new ig.ScreenFader({
                fade: 'out',
                speed: 4
                //delayAfter: 1,
            });

            console.log('========== ENTER BATTLE MODE ==========');

            if(ig.global.gameState !== 'continue') {
                var e;

                // Determine position range on battlefield to spawn enemy
                //var mapsize = {x: this.collisionMap.width * ig.global.tilesize, y: this.collisionMap.height * ig.global.tilesize};

                var party_spawner = this.getEntitiesByType(ig.global.EntityParty_spawner)[0];
                var party_temp = [];
                var party_temp_pos = [];
                var party_members_pool = [EntityFemale_sage, EntitySword_master, EntityWyvern_lord];

                // Spawn party leader (main character)
                party_temp[0] = this.spawnEntity(
                    ig.global.EntityHero,
                    party_spawner.pos.x,
                    party_spawner.pos.y,
                    {name: ig.global.main_player_name}
                );

                // Spawn party members (non-main character)
                for(var p = 1; p <= party_members_pool.length; p++) {
                    // Align party members relative to party leader (main character)
                    var party_member_pos = ig.global.alignToGrid(
                        party_temp[0].pos.x - (party_members_pool.length + party_members_pool.length * ig.global.tilesize) + p * 2 * ig.global.tilesize,
                        party_temp[0].pos.y + ig.global.tilesize
                    );
                    party_temp.push(this.spawnEntity(party_members_pool[p - 1], party_member_pos.x, party_member_pos.y));
                }

                // Overwrite newly spawned party with stored game properties for party units (except position)
                for(var i = 0; i < ig.global.party.length; i++) {
                    var props = Object.keys(ig.global.party[i]);
                    for(var p = 0; p < props.length; p++) {
                        // TODO: Optimize this.
                        if([
                            'entityClassName',
                            'name',
                            'classType',
                            'maxMovementActive',
                            'level',
                            'exp_curr',
                            'exp_levelUp',
                            'health',
                            'health_max',
                            'className',
                            'levelUpBonuses',
                            'stat',
                            'derived_stats',
                            'mod',
                            'appliedTerrainMod',
                            'terrainMod',
                            'levelUpStatPercentage',
                            'item',
                            'item_uses',
                            'validWeapon',
                            'selectedItemIndex',
                            'selectedWeapon',
                            'equippedWeapon',
                            'isEquipping',
                            'hasEquippedItem',
                            'atk_dist',
                            'atk_area'
                            ].indexOf(props[p]) >= 0
                        ) {
                            party_temp[i][props[p]] = ig.global.party[i][props[p]];
                        }
                    }

                    // Remove killed player units from previous map
                    if(ig.global.party[i]._killed === true) {
                        party_temp[i].kill();
                    }
                }

                // Update stored game properties
                ig.global.party = party_temp;

                // Generate, spawn enemies, and add enemies to total units in this battle
                var enemy_spawner = this.getEntitiesByType(ig.global.EntityEnemy_spawner);
                var enemy_party_temp = [];

                if(enemy_spawner.length > 0) {
                    for(e = 0; e < enemy_spawner.length; e++) {
                        enemy_party_temp.push(enemy_spawner[e].spawnEnemies(enemy_spawner[e].generateEnemies(ig.global.encounter.spawn_min, ig.global.encounter.spawn_max))[0]);
                    }
                }

                // Add player and friendlies to total units in this battle
                this.units = this.units.concat(ig.global.party, enemy_party_temp);

                for(u = 0; u < this.units.length; u++){
                    if(this.units[u].unitType === 'player'){
                        this.numPlayers += 1;
                    } else if(this.units[u].unitType === 'enemy'){
                        this.numEnemies += 1;
                    }
                }

                // Store reference of this.units for Stats screen
                this.unitStats = this.units;

                console.log('Unit order sorted:');
                for(e = 0; e < this.units.length; e++) {
                    console.log(e + ' --> ' + this.units[e].name);
                }
            } else {
                // Restore global data
                ig.global.currentLevel = this.storage.getInt('currentLevel');
                ig.global.gold = this.storage.getInt('gold');

                // Restore battle data
                this.activeUnit = this.storage.getInt('activeUnit');
                this.turn_counter = this.storage.getInt('turn_counter');

                // Restore unit data
                var units_tmp = this.storage.get('units');
                for(var u = 0; u < units_tmp.length; u++) {
                    this.units[u] = this.spawnEntity(units_tmp[u].entityClassName[0], units_tmp[u].pos.x, units_tmp[u].pos.y);
                    var props = Object.keys(units_tmp[u]);
                    for(var p = 0; p < props.length; p++) {
                        // TODO: Optimize this.
                        if([
                            'entityClassName',
                            'unitType',
                            'turnUsed',
                            'name',
                            'classType',
                            'type',
                            'checkAgainst',
                            'init_pos',
                            'maxMovementActive',
                            'entitiesAvoid',
                            'entitiesIgnore',
                            'level',
                            'exp_curr',
                            'exp_levelUp',
                            'health',
                            'health_max',
                            'className',
                            'levelUpBonuses',
                            'stat',
                            'derived_stats',
                            'mod',
                            'appliedTerrainMod',
                            'terrainMod',
                            'levelUpStatPercentage',
                            'item',
                            'item_uses',
                            'validWeapon',
                            'selectedItemIndex',
                            'selectedWeapon',
                            'equippedWeapon',
                            'isEquipping',
                            'hasEquippedItem',
                            'atk_dist',
                            'atk_area',
                            'mov_curr',
                            'waitUntilTurn',
                            'immovable'
                            ].indexOf(props[p]) >= 0
                        ) {
                            this.units[u][props[p]] = units_tmp[u][props[p]];
                        }
                    }

                    // Restore unit's item methods
                    for(var i = 0; i < this.units[u].item.length; i++) {
                        var items = Object.keys(this.itemCatalog);
                        for(var n = 0; n < items.length; n++) {
                            if(this.units[u].item[i].name === this.itemCatalog[items[n]].name) {
                                this.units[u].item[i] = this.itemCatalog[items[n]];
                            }
                        }
                    }

                    // Remove killed units
                    if(units_tmp[u]._killed === true) {
                        this.units[u].kill();
                    }
                }

                for(u = 0; u < this.units.length; u++){
                    if(this.units[u].unitType === 'player'){
                        this.numPlayers += 1;

                        // Restore party data persistence between maps
                        ig.global.party.push(this.units[u]);
                    } else if(this.units[u].unitType === 'enemy'){
                        this.numEnemies += 1;
                    }
                }

                this.unitStats = this.units;

                console.log('Resuming suspended game.');
            }

            this.clickedUnit = this.units[this.activeUnit];
            this.targetedUnit = this.units[this.activeUnit];

            ig.global.gameState = null;

            console.log('========== BEGIN BATTLE ==========');
        }, // End init method

        update: function() {
            this.parent();

            var i, slot;
            // Have we displayed the player phase modal for the beginning of the turn?
            if(this.units[this.activeUnit].unitType === 'player' && this.displayedPlayerPhaseModal === false) {
                // this.freeCamera = false;
                this.battleState = 'player_phase';
                this.displayedEnemyPhaseModal = false;
                ig.music.play(this.levels[ig.global.currentLevel].music);
                if(!this.playingTurnSFX){
                    this.playingTurnSFX = true;
                    this.sfx.play('next_turn');
                }
            }

            if(this.units[this.activeUnit].unitType === 'enemy' && this.displayedEnemyPhaseModal === false) {
                this.freeCamera = false;
                this.battleState = 'enemy_phase';
                ig.music.play('augustine_army');
                if(!this.playingTurnSFX){
                    this.playingTurnSFX = true;
                    this.sfx.play('next_turn');
                }
            }

            // Handle unit movement order
            if(this.units[this.activeUnit].turnUsed) {
                var u;

                this.activeUnit = (this.activeUnit + 1) % this.units.length;

                // Increase turn counter if active unit is main player (before main player moves)
                if(this.units[this.activeUnit] instanceof ig.global.EntityHero) {
                    this.turn_counter++;
                    console.log('Battle currently in turn ' + this.turn_counter);

                    // A new turn is starting, so we need to re-draw the "Player Phase" modal
                    this.displayedPlayerPhaseModal = false;

                    // Reset the timer which governs how long the player phase modal was displayed
                    this.phaseTimer.reset();
                }

                if(this.units[this.activeUnit].unitType === 'enemy') {
                    // ig.music.play('augustine_army');
                    // A new turn is starting, we need to re-draw the "Enemy phase" modal
                    // this.displayedEnemyPhaseModal = false;

                    // Reset the timer which governs how long the enemy phase modal was displayed
                    this.enemyPhaseTimer.reset();
                }

                // Clean buttons
                this.menuVisible = false;
                ig.global.killAllButtons(ig.Button);

                // Auto-select next active player unit
                if(this.units[this.activeUnit].unitType === 'player') {
                    this.clickedUnit = this.units[this.activeUnit];
                    this.targetedUnit = this.units[this.activeUnit];
                } else {
                    this.clickedUnit = null;
                    this.targetedUnit = null;
                }

                this.attackTargets = [];
                this.assistTargets = [];
                this.tradeTargets = [];

                // Check how many units have moved for this turn
                var units_moved = 0;
                for(u = 0; u < this.units.length; u++) {
                    if(this.units[u].turnUsed) {
                        units_moved++;
                    }
                }

                // If all units have moved for this turn, set all alive units to be able to move again
                if(units_moved === this.units.length) {
                    for(u = 0; u < this.units.length; u++) {
                        if(!this.units[u]._killed) {
                            this.units[u].turnUsed = false;
                            this.units[u].mov_curr = this.units[u].stat.mov;
                        }
                    }
                }

                // Check if there are any enemy units remaining on the battlefield
                var main_player_alive = false;
                for(u = 0; u < this.units.length; u++) {
                    //} else if(this.units[u].name === ig.global.main_player_name && !this.units[u]._killed)
                    if(this.units[u] instanceof ig.global.EntityHero && !this.units[u]._killed) {
                        main_player_alive = true;
                        break;
                    }
                }
                // If game cannot find main character (main player is defeated), enter game over state
                if(!main_player_alive) {
                    ig.system.setGame(ig.GameOver);
                }
            }

            // Game sub-selection states
            if(this.units[this.activeUnit] !== this.targetedUnit) {
                var t;

                if(this.battleState === 'attack') {
                    // Player unit initiates the attack
                    if(this.units[this.activeUnit].unitType === 'player') {
                        // Target is an enemy unit
                        if(this.targetedUnit && this.targetedUnit.unitType === 'enemy') {
                            // Apply terrain bonuses before battle
                            this.applyTerrainBonuses(this.units[this.activeUnit]);
                            // Apply terrain bonuses to targeted unit
                            this.applyTerrainBonuses(this.targetedUnit);
                            // Find unit from list of available targets
                            for(t = 0; t < this.attackTargets.length; t++) {
                                if(this.targetedUnit === this.attackTargets[t].unit) {
                                    this.attackDistance = this.attackTargets[t].dist;
                                    this.sfx.play('click');
                                    this.fadeInToBattleAnim();
                                    this.battleState = 'battle_transitionIn';
                                    break;
                                }
                            }
                        }
                    // Enemy unit initiates the attack
                    } else if(this.units[this.activeUnit].unitType === 'enemy') {
                        // Apply terrain bonuses before battle
                        this.applyTerrainBonuses(this.units[this.activeUnit]);
                        // Target is a player unit
                        if(this.targetedUnit.unitType === 'player') {
                            // Apply terrain bonuses to targeted unit
                            this.applyTerrainBonuses(this.targetedUnit);
                            this.fadeInToBattleAnim();
                            this.battleState = 'battle_transitionIn';
                        } else {
                            this.attackQueue = []; // Reset attack queue
                            this.battleState = null; // End battle animation (stop displaying screen text)
                            this.units[this.activeUnit].turnUsed = true; // End active unit's turn
                        }
                    }
                } else if(this.battleState === 'assist') {
                    // Player unit initiates the assist and target unit is a player unit
                    if(this.units[this.activeUnit].unitType === 'player' && this.targetedUnit.unitType === 'player') {
                        // Find unit from list of available targets
                        for(t = 0; t < this.assistTargets.length; t++) {
                            // Heal only if target unit health is not fully health
                            if(this.targetedUnit === this.assistTargets[t] && this.targetedUnit.health < this.targetedUnit.health_max) {
                                this.targetedUnit.receiveDamage(this.units[this.activeUnit].item[0].atk - this.units[this.activeUnit].stat.mag, this.units[this.activeUnit]);
                                this.units[this.activeUnit].item[0].effect(this.units[this.activeUnit]);
                                console.log('current exp: ' + this.units[this.activeUnit].exp_curr);

                                this.units[this.activeUnit].turnUsed = true;
                                break;
                            }
                        }
                    }
                } else if(this.battleState === 'trade' || this.battleState === 'trading') {
                    // Player unit initiates the trade and target unit is a player unit
                    if(this.battleState === 'trade' && (this.units[this.activeUnit].unitType === 'player' || this.targetedUnit.unitType === 'player')) {
                        // Find unit from list of available targets
                        for(t = 0; t < this.tradeTargets.length; t++) {
                            if(this.targetedUnit === this.tradeTargets[t]) {
                                this.battleState = 'trading';
                                break;
                            }
                        }
                    // Player unit is trading with target unit
                    } else if(this.battleState === 'trading') {
                        // Display active unit's inventory
                        if(typeof this.getEntityByName('btn_item_a0') === 'undefined') {
                            for(i = 0; i < this.units[this.activeUnit].item.length; i++) {
                                this.spawnEntity(ig.global.EntityButton_trade_item_active, this.screen.x + 160, this.screen.y + (i + 1) * 32 + 200, {index: i});
                            }
                        }

                        // Display target unit's inventory
                        if(typeof this.getEntityByName('btn_item_t0') === 'undefined') {
                            for(i = 0; i < this.targetedUnit.item.length; i++) {
                                this.spawnEntity(ig.global.EntityButton_trade_item_target, this.screen.x + 400, this.screen.y + (i + 1) * 32 + 200, {index: i});
                            }
                        }

                        // An item from active unit's inventory and an item from target unit's inventory has been seelcted
                        if(this.units[this.activeUnit].selectedItemIndex !== null && this.targetedUnit.selectedItemIndex !== null) {
                            // Perform trade and update inventories
                            this.tradeItems(this.units[this.activeUnit], this.targetedUnit, this.units[this.activeUnit].selectedItemIndex, this.targetedUnit.selectedItemIndex);

                            // Reset selected items
                            this.units[this.activeUnit].selectedItemIndex = null;
                            this.targetedUnit.selectedItemIndex = null;

                            this.menuVisible = false;
                            ig.global.killAllButtons(ig.Button);
                        }
                    }
                // Prepare the battle animation sequence
                } else if(this.battleState === 'battle_prepare') {
                    // Store active unit and targeted unit battle stats into temporary property (to prevent null stats on unit defeat)
                    this.battleAnimStats.activeUnit = {
                        name:          this.units[this.activeUnit].name,
                        health:        this.units[this.activeUnit].health,
                        health_max:    this.units[this.activeUnit].health_max,
                        stat:          this.units[this.activeUnit].stat,
                        derived_stats: this.units[this.activeUnit].derived_stats,
                        mod:           this.units[this.activeUnit].mod,
                        item:          this.units[this.activeUnit].item
                    };

                    this.battleAnimStats.targetedUnit = {
                        name:          this.targetedUnit.name,
                        health:        this.targetedUnit.health,
                        health_max:    this.targetedUnit.health_max,
                        stat:          this.targetedUnit.stat,
                        derived_stats: this.targetedUnit.derived_stats,
                        mod:           this.targetedUnit.mod,
                        item:          this.targetedUnit.item
                    };

                    // Layer 1: Battle animation background
                    if(this.battleAnimControllers.background === null) {
                        this.battleAnimControllers.background = this.spawnEntity(ig.global.EntityBattle_anim_background, this.screen.x, this.screen.y);
                    }

                    var activeUnit_terrain = this.getTerrain(this.units[this.activeUnit].pos.x, this.units[this.activeUnit].pos.y).type;
                    this.battleAnimControllers.background.currentAnim =
                        activeUnit_terrain === 'Plain'    ? this.battleAnimControllers.background.anims.plains :
                        activeUnit_terrain === 'Fortress' ? this.battleAnimControllers.background.anims.fortress :
                        activeUnit_terrain === 'Forest'   ? this.battleAnimControllers.background.anims.forest :
                        activeUnit_terrain === 'Mountain' ? this.battleAnimControllers.background.anims.mountains :
                        activeUnit_terrain === 'Sand'     ? this.battleAnimControllers.background.anims.sand :
                        activeUnit_terrain === 'Castle'   ? this.battleAnimControllers.background.anims.castle :
                        activeUnit_terrain === 'Throne'   ? this.battleAnimControllers.background.anims.throne :
                        activeUnit_terrain === 'Snow'     ? this.battleAnimControllers.background.anims.snow :
                        activeUnit_terrain === 'S. Forest'? this.battleAnimControllers.background.anims.snowforest :
                        this.battleAnimControllers.background.anims.plains;

                    // Layer 2: Battle animation units
                    // Spawn active unit animation
                    var a_battleAnim = this.spawnEntity(this.units[this.activeUnit].battleAnim, 0, 0);
                    a_battleAnim.pos = {
                        x: this.screen.x + ig.system.width / 2 - a_battleAnim.size.x / 2,
                        y: this.screen.y + 320 - a_battleAnim.size.y
                    };

                    if(this.units[this.activeUnit].unitType === 'enemy') {
                        a_battleAnim.flip = true;
                    }

                    if(this.attackDistance > 1) {
                        if(this.units[this.activeUnit].unitType === 'enemy') {
                            a_battleAnim.pos.x = this.screen.x + ig.system.width / 2 - a_battleAnim.size.x / 2 - 100;
                        } else if(this.units[this.activeUnit].unitType === 'player') {
                            a_battleAnim.pos.x = this.screen.x + ig.system.width / 2 - a_battleAnim.size.x / 2 + 100;
                        }
                    }

                    // Push active unit animation into attack queue (initial attack)
                    this.attackQueue.push(a_battleAnim);

                    // Spawn target unit animation
                    var t_battleAnim = this.spawnEntity(this.targetedUnit.battleAnim, 0, 0);
                    t_battleAnim.pos = {
                        x: this.screen.x + ig.system.width / 2 - t_battleAnim.size.x / 2,
                        y: this.screen.y + 320 - t_battleAnim.size.y
                    };

                    if(this.targetedUnit.unitType === 'enemy') {
                        t_battleAnim.flip = true;
                    }

                    if(this.attackDistance > 1) {
                        if(this.targetedUnit.unitType === 'enemy') {
                            t_battleAnim.pos.x = this.screen.x + ig.system.width / 2 - a_battleAnim.size.x / 2 - 100;
                        } else if(this.units[this.activeUnit].unitType === 'player') {
                            t_battleAnim.pos.x = this.screen.x + ig.system.width / 2 - a_battleAnim.size.x / 2 + 100;
                        }
                    }

                    // Push target unit animation into attack queue (counterattack)
                    this.attackQueue.push(t_battleAnim);

                    // Layer 3: Battle animation effects
                    if(this.battleAnimControllers.effects === null) {
                        this.battleAnimControllers.effects = this.spawnEntity(ig.global.EntityBattle_anim_effects, this.screen.x, this.screen.y);
                    }

                    // Layer 4: Battle animation data display
                    if(this.battleAnimControllers.gui === null) {
                        this.battleAnimControllers.gui = this.spawnEntity(ig.global.EntityBattle_anim_gui, this.screen.x, this.screen.y);
                    }
                    this.battleAnimControllers.gui.currentAnim = this.battleAnimControllers.gui.anims.showGUI;

                    // If difference in units' speed is large enough, push higher speed unit animation into attack queue (second attack)
                    if(Math.abs(this.units[this.activeUnit].stat.spd - this.targetedUnit.stat.spd) >= 5) {
                        // Also, check if the unit who is able to perform a second attack has enough weapon uses for 2 attacks.
                        // If the unit does not have enough weapon uses for a second attack, the do not get to attack a second time.
                        if(this.units[this.activeUnit].stat.spd > this.targetedUnit.stat.spd && this.units[this.activeUnit].item_uses[0] >= 2) {
                            this.attackQueue.push(a_battleAnim);
                        } else if(this.units[this.activeUnit].stat.spd < this.targetedUnit.stat.spd && this.targetedUnit.item_uses[0] >= 2) {
                            this.attackQueue.push(t_battleAnim);
                        }
                    }

                    // Realign layers back to screen view
                    this.battleAnimControllers.background.pos = {x: this.screen.x, y: this.screen.y};
                    this.battleAnimControllers.effects.pos = {x: this.screen.x, y: this.screen.y};
                    this.battleAnimControllers.gui.pos = {x: this.screen.x, y: this.screen.y};

                    // Start the battle animation sequence
                    this.menuVisible = true;
                    this.atkAnimTimer.reset();
                    ig.global.killAllButtons(ig.Button);
                    this.battleState = 'battle_start';
                // Initiate battle animation sequence ------------------------------------------------------------
                } else if(this.battleState === 'battle_start') {
                    // Quickfix for dynamic unit animation sheet sizes when swapping attack animations
                    if(this.attackDistance > 1) {
                        if(this.units[this.activeUnit].unitType === 'enemy') {
                            this.attackQueue[0].pos = {
                                x: this.screen.x + ig.system.width / 2 - this.attackQueue[0].size.x / 2 - 100,
                                y: this.screen.y + 320 - this.attackQueue[0].size.y
                            };

                            this.attackQueue[1].pos = {
                                x: this.screen.x + ig.system.width / 2 - this.attackQueue[1].size.x / 2 + 100,
                                y: this.screen.y + 320 - this.attackQueue[1].size.y
                            };
                        } else if(this.units[this.activeUnit].unitType === 'player') {
                            this.attackQueue[0].pos = {
                                x: this.screen.x + ig.system.width / 2 - this.attackQueue[0].size.x / 2 + 100,
                                y: this.screen.y + 320 - this.attackQueue[0].size.y
                            };

                            this.attackQueue[1].pos = {
                                x: this.screen.x + ig.system.width / 2 - this.attackQueue[1].size.x / 2 - 100,
                                y: this.screen.y + 320 - this.attackQueue[1].size.y
                            };
                        }
                    } else {
                        this.attackQueue[0].pos = {
                            x: this.screen.x + ig.system.width / 2 - this.attackQueue[0].size.x / 2,
                            y: this.screen.y + 320 - this.attackQueue[0].size.y
                        };

                        this.attackQueue[1].pos = {
                            x: this.screen.x + ig.system.width / 2 - this.attackQueue[1].size.x / 2,
                            y: this.screen.y + 320 - this.attackQueue[1].size.y
                        };
                    }

                    // Start battle sequence after some defined time
                    // Initial attack ------------------------------------------
                    if(this.attackQueueIndex === 0 && this.atkAnimTimer.delta() > 1) {
                        if(this.units[this.activeUnit].hasEquippedItem === true && this.units[this.activeUnit].item[0].affinity !== 'staff') {
                            // Active unit has not started their attack animation yet
                            if(this.attackQueue[0].currentAnim === this.attackQueue[0].anims.idle) {
                                console.log(this.battleAnimStats.activeUnit.name + ' vs. ' + this.battleAnimStats.targetedUnit.name);

                                // Compute if active unit triggers critical hit on target unit
                                if(this.computeBattleCritChance(this.units[this.activeUnit], this.targetedUnit) > Math.random() * 100) {
                                    // Play active unit's critical attack animation
                                    this.attackQueue[0].currentAnim = this.attackQueue[0].anims.crit0;
                                    this.attackQueue[0].currentAnim.rewind();
                                    console.log('crit-trigger-0');
                                // No critical hit triggered --> Proceed to normal attack (compute hit/miss later)
                                } else {
                                    // Play active unit's normal attack animation
                                    this.attackQueue[0].currentAnim = this.attackQueue[0].anims.attack0;
                                    this.attackQueue[0].currentAnim.rewind();
                                }
                            // Active unit is on the attack (normal or critical) frame where it is about to strike target unit
                            } else if((this.attackQueue[0].currentAnim === this.attackQueue[0].anims.attack0 || this.attackQueue[0].currentAnim === this.attackQueue[0].anims.crit0) && this.attackQueue[0].currentAnim.loopCount >= 1) {
                                // Active unit is running critical hit animation
                                if(this.attackQueue[0].currentAnim === this.attackQueue[0].anims.crit0) {
                                    // Continue running next set of critical hit animation
                                    this.attackQueue[0].currentAnim = this.attackQueue[0].anims.crit1;
                                    this.attackQueue[0].currentAnim.rewind();
                                    console.log('crit-trigger-1');

                                    // Battle animation screen effects
                                    this.displayBattleScreenEffect(this.units[this.activeUnit]);

                                    // Active unit's attack hit
                                    console.log('Critical hit');
                                    this.sfx.play('crit');

                                    this.screenshakeIntensity = 10;

                                    // Compute damage
                                    this.battleAnimStats.targetedUnit.health -= this.computeBattleCritDamage(this.units[this.activeUnit], this.targetedUnit);

                                    // Do post-damage health checks and clamp health to valid values
                                    if(this.battleAnimStats.targetedUnit.health < 0) {
                                        this.battleAnimStats.targetedUnit.health = 0;
                                    } else if(this.battleAnimStats.targetedUnit.health > this.battleAnimStats.targetedUnit.health_max) {
                                        this.battleAnimStats.targetedUnit.health = this.battleAnimStats.targetedUnit.health_max;
                                    }

                                // Active unit is running normal hit animation
                                } else if(this.attackQueue[0].currentAnim === this.attackQueue[0].anims.attack0) {
                                    // Continue running next set of normal hit animation
                                    this.attackQueue[0].currentAnim = this.attackQueue[0].anims.attack1;
                                    this.attackQueue[0].currentAnim.rewind();

                                    // Battle animation screen effects
                                    this.displayBattleScreenEffect(this.units[this.activeUnit]);

                                    // Compute if active unit's attack hit or missed
                                    // Active unit's attack hit
                                    if(this.computeBattleNormalHitChance(this.units[this.activeUnit], this.targetedUnit) + this.weaponTriangle(this.units[this.activeUnit], this.targetedUnit) > Math.random() * 100) {
                                        this.sfx.play('hit');
                                        console.log('Normal hit');

                                        this.screenshakeIntensity = 5;

                                        // Compute damage
                                        this.battleAnimStats.targetedUnit.health -= this.computeBattleNormalDamage(this.units[this.activeUnit], this.targetedUnit);

                                        // Do post-damage health checks and clamp health to valid values
                                        if(this.battleAnimStats.targetedUnit.health < 0) {
                                            this.battleAnimStats.targetedUnit.health = 0;
                                        } else if(this.battleAnimStats.targetedUnit.health > this.battleAnimStats.targetedUnit.health_max) {
                                            this.battleAnimStats.targetedUnit.health = this.battleAnimStats.targetedUnit.health_max;
                                        }
                                    // Active unit's attack missed
                                    } else {
                                        this.sfx.play('miss');
                                        console.log('Attack missed');

                                        // Play target unit's dodge animation
                                        this.attackQueue[1].currentAnim = this.attackQueue[1].anims.dodge;
                                        this.attackQueue[1].currentAnim.rewind();
                                    }
                                }
                            // Active unit has finished playing their attack animation
                            } else if((this.attackQueue[0].currentAnim === this.attackQueue[0].anims.attack1 || this.attackQueue[0].currentAnim === this.attackQueue[0].anims.crit1) && this.attackQueue[0].currentAnim.loopCount >= 1) {
                                this.attackQueue[0].currentAnim = this.attackQueue[0].anims.idle; // Prepare active unit animation for possible second attack
                                this.attackQueue[1].currentAnim = this.attackQueue[1].anims.idle; // Prepare target unit animation for possible second attack

                                // Determine next stage of battle animation sequence
                                if(this.battleAnimStats.targetedUnit.health > 0) {
                                    this.attackQueueIndex = 1; // Target unit is still alive; target unit's turn to counterattack
                                } else {
                                    this.attackQueueIndex = 3; // Target unit is not alive; end battle animation sequence
                                }
                            }
                        } else {
                            this.attackQueueIndex = 1;
                        }
                    // Counterattack -------------------------------------------
                    } else if(this.attackQueueIndex === 1) {
                        if(this.targetedUnit.hasEquippedItem === true && this.targetedUnit.item[0].affinity !== 'staff') {
                            // Target unit has not started their attack animation yet
                            if(this.attackQueue[1].currentAnim === this.attackQueue[1].anims.idle) {
                                // Compute if target unit triggers critical hit on active unit
                                if(this.computeBattleCritChance(this.targetedUnit, this.units[this.activeUnit]) > Math.random() * 100) {
                                    // Play target unit's critical attack animation
                                    this.attackQueue[1].currentAnim = this.attackQueue[1].anims.crit0;
                                    this.attackQueue[1].currentAnim.rewind();
                                // No critical hit triggered --> Proceed to normal attack (compute hit/miss later)
                                } else {
                                    // Play target unit's normal attack animation
                                    this.attackQueue[1].currentAnim = this.attackQueue[1].anims.attack0;
                                    this.attackQueue[1].currentAnim.rewind();
                                }
                            // Target unit is on the attack (normal or critical) frame where it is about to strike active unit
                            } else if((this.attackQueue[1].currentAnim === this.attackQueue[1].anims.attack0 || this.attackQueue[1].currentAnim === this.attackQueue[1].anims.crit0) && this.attackQueue[1].currentAnim.loopCount >= 1) {
                                // Target unit is running critical hit animation
                                if(this.attackQueue[1].currentAnim === this.attackQueue[1].anims.crit0) {
                                    // Continue running next set of critical hit animation
                                    this.attackQueue[1].currentAnim = this.attackQueue[1].anims.crit1;
                                    this.attackQueue[1].currentAnim.rewind();

                                    // Battle animation screen effects
                                    this.displayBattleScreenEffect(this.targetedUnit);

                                    // Target unit's attack hit
                                    console.log('Critical hit');
                                    this.sfx.play('crit');

                                    this.screenshakeIntensity = 10;

                                    // Compute damage
                                    this.battleAnimStats.activeUnit.health -= this.computeBattleCritDamage(this.targetedUnit, this.units[this.activeUnit]);

                                    // Do post-damage health checks and clamp health to valid values
                                    if(this.battleAnimStats.activeUnit.health < 0) {
                                        this.battleAnimStats.activeUnit.health = 0;
                                    } else if(this.battleAnimStats.activeUnit.health > this.battleAnimStats.activeUnit.health_max) {
                                        this.battleAnimStats.activeUnit.health = this.battleAnimStats.activeUnit.health_max;
                                    }
                                // Target unit is running normal hit animation
                                } else if(this.attackQueue[1].currentAnim === this.attackQueue[1].anims.attack0) {
                                    // Continue running next set of normal hit animation
                                    this.attackQueue[1].currentAnim = this.attackQueue[1].anims.attack1;
                                    this.attackQueue[1].currentAnim.rewind();

                                    // Battle animation screen effects
                                    this.displayBattleScreenEffect(this.targetedUnit);

                                    // Compute if target unit's attack hit or missed
                                    // Target unit's attack hit
                                    if(this.computeBattleNormalHitChance(this.targetedUnit, this.units[this.activeUnit]) + this.weaponTriangle(this.targetedUnit, this.units[this.activeUnit]) > Math.random() * 100) {
                                        console.log('Normal hit');
                                        this.sfx.play('hit');
                                        this.screenshakeIntensity = 5;

                                        // Compute damage
                                        this.battleAnimStats.activeUnit.health -= this.computeBattleNormalDamage(this.targetedUnit, this.units[this.activeUnit]);

                                        // Do post-damage health checks and clamp health to valid values
                                        if(this.battleAnimStats.activeUnit.health < 0) {
                                            this.battleAnimStats.activeUnit.health = 0;
                                        } else if(this.battleAnimStats.activeUnit.health > this.battleAnimStats.activeUnit.health_max) {
                                            this.battleAnimStats.activeUnit.health = this.battleAnimStats.activeUnit.health_max;
                                        }
                                    // Target unit's attack missed
                                    } else {
                                        this.sfx.play('miss');
                                        console.log('Attack missed');

                                        // Play active unit's dodge animation
                                        this.attackQueue[0].currentAnim = this.attackQueue[0].anims.dodge;
                                        this.attackQueue[0].currentAnim.rewind();
                                    }
                                }
                            // Target unit has finished playing their attack animation
                            } else if((this.attackQueue[1].currentAnim === this.attackQueue[1].anims.attack1 || this.attackQueue[1].currentAnim === this.attackQueue[1].anims.crit1) && this.attackQueue[1].currentAnim.loopCount >= 1) {
                                this.attackQueue[0].currentAnim = this.attackQueue[0].anims.idle; // Prepare active unit animation for possible second attack
                                this.attackQueue[1].currentAnim = this.attackQueue[1].anims.idle; // Prepare target unit animation for possible second attack

                                // Determine next stage of battle animation sequence
                                // Both units alive and there is still a unit remaining in the attack queue (second attack)
                                if(this.battleAnimStats.activeUnit.health > 0 && this.battleAnimStats.targetedUnit.health > 0 && this.attackQueue.length >= 3) {
                                    // Prepare the unit animation for attack
                                    this.attackQueue[2].currentAnim = this.attackQueue[2].anims.idle;
                                    this.attackQueue[2].currentAnim.rewind();

                                    this.attackQueueIndex = 2; // Unit's turn to perform second attack
                                // One of the units is defeated or there is no remaining units in the attack queue
                                } else {
                                    this.attackQueueIndex = 3; // End battle animation sequence
                                }
                            }
                        } else {
                            if(this.attackQueue.length >= 3) {
                                this.attackQueueIndex = 2;
                            } else {
                                this.attackQueueIndex = 3;
                            }
                        }
                    // Second attack -------------------------------------------
                    } else if(this.attackQueueIndex === 2) {
                        // Third unit in attack queue is active unit; active unit attacks second time
                        if(this.attackQueue[2] === this.attackQueue[0] && this.units[this.activeUnit].hasEquippedItem === true && this.units[this.activeUnit].item[0].affinity !== 'staff') {
                            // Active unit has not started their attack animation yet
                            if(this.attackQueue[0].currentAnim === this.attackQueue[0].anims.idle) {
                                // Compute if active unit triggers critical hit on target unit
                                if(this.computeBattleCritChance(this.units[this.activeUnit], this.targetedUnit) > Math.random() * 100) {
                                    // Play active unit's critical attack animation
                                    this.attackQueue[0].currentAnim = this.attackQueue[0].anims.crit0;
                                    this.attackQueue[0].currentAnim.rewind();
                                // No critical hit triggered --> Proceed to normal attack (compute hit/miss later)
                                } else {
                                    // Play active unit's normal attack animation
                                    this.attackQueue[0].currentAnim = this.attackQueue[0].anims.attack0;
                                    this.attackQueue[0].currentAnim.rewind();
                                }
                            // Active unit is on the attack (normal or critical) frame where it is about to strike target unit
                            } else if((this.attackQueue[0].currentAnim === this.attackQueue[0].anims.attack0 || this.attackQueue[0].currentAnim === this.attackQueue[0].anims.crit0) && this.attackQueue[0].currentAnim.loopCount >= 1) {
                                // Active unit is running critical hit animation
                                if(this.attackQueue[0].currentAnim === this.attackQueue[0].anims.crit0) {
                                    // Continue running next set of critical hit animation
                                    this.attackQueue[0].currentAnim = this.attackQueue[0].anims.crit1;
                                    this.attackQueue[0].currentAnim.rewind();

                                    // Battle animation screen effects
                                    this.displayBattleScreenEffect(this.units[this.activeUnit]);

                                    // Active unit's attack hit
                                    console.log('Critical hit');
                                    this.sfx.play('hit');

                                    this.screenshakeIntensity = 10;

                                    // Compute damage
                                    this.battleAnimStats.targetedUnit.health -= this.computeBattleCritDamage(this.units[this.activeUnit], this.targetedUnit);

                                    // Do post-damage health checks and clamp health to valid values
                                    if(this.battleAnimStats.targetedUnit.health < 0) {
                                        this.battleAnimStats.targetedUnit.health = 0;
                                    } else if(this.battleAnimStats.targetedUnit.health > this.battleAnimStats.targetedUnit.health_max) {
                                        this.battleAnimStats.targetedUnit.health = this.battleAnimStats.targetedUnit.health_max;
                                    }
                                // Active unit is running normal hit animation
                                } else if(this.attackQueue[0].currentAnim === this.attackQueue[0].anims.attack0) {
                                    // Continue running next set of normal hit animation
                                    this.attackQueue[0].currentAnim = this.attackQueue[0].anims.attack1;
                                    this.attackQueue[0].currentAnim.rewind();

                                    // Battle animation screen effects
                                    this.displayBattleScreenEffect(this.units[this.activeUnit]);

                                    // Compute if active unit's attack hit or missed
                                    // Active unit's attack hit
                                    if(this.computeBattleNormalHitChance(this.units[this.activeUnit], this.targetedUnit) + this.weaponTriangle(this.units[this.activeUnit], this.targetedUnit) > Math.random() * 100) {
                                        console.log('Normal hit');
                                        this.sfx.play('hit');
                                        this.screenshakeIntensity = 5;

                                        // Compute damage
                                        this.battleAnimStats.targetedUnit.health -= this.computeBattleNormalDamage(this.units[this.activeUnit], this.targetedUnit);

                                        // Do post-damage health checks and clamp health to valid values
                                        if(this.battleAnimStats.targetedUnit.health < 0) {
                                            this.battleAnimStats.targetedUnit.health = 0;
                                        } else if(this.battleAnimStats.targetedUnit.health > this.battleAnimStats.targetedUnit.health_max) {
                                            this.battleAnimStats.targetedUnit.health = this.battleAnimStats.targetedUnit.health_max;
                                        }
                                    // Active unit's attack missed
                                    } else {
                                        this.sfx.play('miss');
                                        console.log('Attack missed');

                                        // Play target unit's dodge animation
                                        this.attackQueue[1].currentAnim = this.attackQueue[1].anims.dodge;
                                        this.attackQueue[1].currentAnim.rewind();
                                    }
                                }
                            // Active unit has finished playing their attack animation
                            } else if((this.attackQueue[0].currentAnim === this.attackQueue[0].anims.attack1 || this.attackQueue[0].currentAnim === this.attackQueue[0].anims.crit1) && this.attackQueue[0].currentAnim.loopCount >= 1) {
                                this.attackQueueIndex = 3; // End battle animation sequence
                            }
                        // Third unit in attack queue is target unit; target unit attacks second time
                        } else if(this.attackQueue[2] === this.attackQueue[1] && this.targetedUnit.hasEquippedItem === true && this.targetedUnit.item[0].affinity !== 'staff') {
                            // Target unit has not started their attack animation yet
                            if(this.attackQueue[1].currentAnim === this.attackQueue[1].anims.idle) {
                                // Compute if target unit triggers critical hit on active unit
                                if(this.computeBattleCritChance(this.targetedUnit, this.units[this.activeUnit]) > Math.random() * 100) {
                                    // Play target unit's critical attack animation
                                    this.attackQueue[1].currentAnim = this.attackQueue[1].anims.crit0;
                                    this.attackQueue[1].currentAnim.rewind();
                                // No critical hit triggered --> Proceed to normal attack (compute hit/miss later)
                                } else {
                                    // Play target unit's normal attack animation
                                    this.attackQueue[1].currentAnim = this.attackQueue[1].anims.attack0;
                                    this.attackQueue[1].currentAnim.rewind();
                                }
                            // Target unit is on the attack (normal or critical) frame where it is about to strike active unit
                            } else if((this.attackQueue[1].currentAnim === this.attackQueue[1].anims.attack0 || this.attackQueue[1].currentAnim === this.attackQueue[1].anims.crit0) && this.attackQueue[1].currentAnim.loopCount >= 1) {
                                // Target unit is running critical hit animation
                                if(this.attackQueue[1].currentAnim === this.attackQueue[1].anims.crit0) {
                                    // Continue running next set of critical hit animation
                                    this.attackQueue[1].currentAnim = this.attackQueue[1].anims.crit1;
                                    this.attackQueue[1].currentAnim.rewind();

                                    // Battle animation screen effects
                                    this.displayBattleScreenEffect(this.targetedUnit);

                                    // Target unit's attack hit
                                    console.log('Critical hit');
                                    this.sfx.play('crit');

                                    this.screenshakeIntensity = 10;

                                    // Compute damage
                                    this.battleAnimStats.activeUnit.health -= this.computeBattleCritDamage(this.targetedUnit, this.units[this.activeUnit]);

                                    // Do post-damage health checks and clamp health to valid values
                                    if(this.battleAnimStats.activeUnit.health < 0) {
                                        this.battleAnimStats.activeUnit.health = 0;
                                    } else if(this.battleAnimStats.activeUnit.health > this.battleAnimStats.activeUnit.health_max) {
                                        this.battleAnimStats.activeUnit.health = this.battleAnimStats.activeUnit.health_max;
                                    }
                                // Target unit is running normal hit animation
                                } else if(this.attackQueue[1].currentAnim === this.attackQueue[1].anims.attack0) {
                                    // Continue running next set of normal hit animation
                                    this.attackQueue[1].currentAnim = this.attackQueue[1].anims.attack1;
                                    this.attackQueue[1].currentAnim.rewind();

                                    // Battle animation screen effects
                                    this.displayBattleScreenEffect(this.targetedUnit);

                                    // Compute if target unit's attack hit or missed
                                    // Target unit's attack hit
                                    if(this.computeBattleNormalHitChance(this.targetedUnit, this.units[this.activeUnit]) + this.weaponTriangle(this.targetedUnit, this.units[this.activeUnit]) > Math.random() * 100) {
                                        console.log('Normal hit');
                                        this.sfx.play('hit');
                                        this.screenshakeIntensity = 5;

                                        // Compute damage
                                        this.battleAnimStats.activeUnit.health -= this.computeBattleNormalDamage(this.targetedUnit, this.units[this.activeUnit]);

                                        // Do post-damage health checks and clamp health to valid values
                                        if(this.battleAnimStats.activeUnit.health < 0) {
                                            this.battleAnimStats.activeUnit.health = 0;
                                        } else if(this.battleAnimStats.activeUnit.health > this.battleAnimStats.activeUnit.health_max) {
                                            this.battleAnimStats.activeUnit.health = this.battleAnimStats.activeUnit.health_max;
                                        }
                                    // Target unit's attack missed
                                    } else {
                                        this.sfx.play('miss');
                                        console.log('Attack missed');

                                        // Play active unit's dodge animation
                                        this.attackQueue[0].currentAnim = this.attackQueue[0].anims.dodge;
                                        this.attackQueue[0].currentAnim.rewind();
                                    }
                                }
                            // Target unit has finished playing their attack animation
                            } else if((this.attackQueue[1].currentAnim === this.attackQueue[1].anims.attack1 || this.attackQueue[1].currentAnim === this.attackQueue[1].anims.crit1) && this.attackQueue[1].currentAnim.loopCount >= 1) {
                                this.attackQueueIndex = 3; // End battle animation sequence
                            }
                        } else {
                            this.attackQueueIndex = 3;
                        }
                    // Post-battle computations --------------------------------
                    } else if(this.attackQueueIndex === 3) {
                        if(this.battleAnimStats.activeUnit.health <= 0) {
                            this.attackQueue[0].fade = true; // Set flag to fade away defeated active unit
                            this.sfx.play('death');
                        }
                        if(this.battleAnimStats.targetedUnit.health <= 0) {
                            this.attackQueue[1].fade = true; // Set flag to fade away defeated target unit
                            this.sfx.play('death');
                        }

                        // Decrement units' weapon durability
                        if(this.units[this.activeUnit].item[0] !== null && this.units[this.activeUnit].item[0].type === 'equip') {
                            this.useItemDurability(this.units[this.activeUnit], 0);
                        }
                        if(this.targetedUnit.item[0] !== null && this.targetedUnit.item[0].type === 'equip') {
                            this.useItemDurability(this.targetedUnit, 0);
                        }
                        if(Math.abs(this.units[this.activeUnit].stat.spd - this.targetedUnit.stat.spd) >= 5) {
                            if(this.units[this.activeUnit].stat.spd > this.targetedUnit.stat.spd && this.units[this.activeUnit].item_uses[0] >= 2) {
                                this.useItemDurability(this.units[this.activeUnit], 0);
                            } else if(this.units[this.activeUnit].stat.spd < this.targetedUnit.stat.spd && this.targetedUnit.item_uses[0] >= 2) {
                                this.useItemDurability(this.targetedUnit, 0);
                            }
                        }

                        // Upon death, enemy's equipped item transferred to player inventory, provided slots are available
                        // Player unit is attacker; player unit defeated enemy unit
                        if(this.units[this.activeUnit].unitType === 'player' && this.targetedUnit.unitType === 'enemy' && this.battleAnimStats.targetedUnit.health <= 0) {
                            slot = this.getFreeSlot(this.units[this.activeUnit]);
                            if(slot !== null) {
                                this.item_drop = null;
                                this.item_drop_uses = null;
                                var item = this.generateRandomItem();
                                this.itemDropObject = item;
                                this.displayedItem = false;
                                this.units[this.activeUnit].item[slot] = item;
                                this.units[this.activeUnit].item_uses[slot] = item.uses;
                                console.log(this.units[this.activeUnit].name + ' obtained ' + item.name + '.');
                            } else {
                                var item = this.generateRandomItem();
                                this.itemDropObject = item;
                                this.displayedItem = false;
                                this.item_drop = item;
                                this.item_drop_uses = item.uses;
                                console.log('Cannot obtain ' + this.item_drop.name + ', ' + this.units[this.activeUnit].name + '\'s inventory is full. Please choose an item to discard.');
                                // TODO: Allow unit the option to drop an item to free a slot to obtain the dropped item or choose not to obtain the dropped item at all
                            }
                        // Player unit is defending unit; player unit defeated enemy unit (via counter attack)
                        } else if(this.units[this.activeUnit].unitType === 'enemy' && this.targetedUnit.unitType === 'player' && this.battleAnimStats.activeUnit.health <= 0) {
                            slot = this.getFreeSlot(this.targetedUnit);
                            if(slot !== null) {
                                this.item_drop = null;
                                this.item_drop_uses = null;
                                this.itemDropObject = item;
                                this.displayedItem = false;
                                var item = this.generateRandomItem();
                                this.targetedUnit.item[slot] = item;
                                this.targetedUnit.item_uses[slot] = item.uses;
                                console.log(this.targetedUnit.name + ' obtained ' + item.name + '.');
                            } else {
                                var item = this.generateRandomItem();
                                this.itemDropObject = item;
                                this.displayedItem = false;
                                this.item_drop = item;
                                this.item_drop_uses = item.uses;
                                console.log('Cannot obtain ' + item.name + ', ' + this.targetedUnit.name + '\'s inventory is full. Please choose an item to discard.');
                                // TODO: Allow unit the option to drop an item to free a slot to obtain the dropped item or choose not to obtain the dropped item at all
                            }
                        }

                        // Handle experience gain and level up for player units
                        // Player unit is the attacking unit
                        if(this.units[this.activeUnit].unitType === 'player') {
                            // Enemy unit is the defending unit
                            if(this.targetedUnit.unitType === 'enemy') {
                                // Enemy unit was defeated; player unit gains full experience
                                if(this.battleAnimStats.targetedUnit.health <= 0) {
                                    this.units[this.activeUnit].exp_old = this.units[this.activeUnit].exp_curr;
                                    this.units[this.activeUnit].exp_gain = this.computeExperience(this.units[this.activeUnit], this.targetedUnit, true);
                                    this.units[this.activeUnit].exp_curr += this.units[this.activeUnit].exp_gain;
                                    this.units[this.activeUnit].gainedExp = true;
                                    //console.log("Did we gain exp: " + this.units[this.activeUnit].gainedExp);
                                    console.log(this.units[this.activeUnit].name + ' gained ' + this.units[this.activeUnit].exp_gain + ' exp and now has ' + this.units[this.activeUnit].exp_curr + ' exp for current level ' + this.units[this.activeUnit].level + '.');
                                // Enemy unit is still alive
                                } else {
                                    // Enemy unit was damaged; player unit gains partial experience
                                    if(this.battleAnimStats.targetedUnit.health !== this.targetedUnit.health) {
                                        this.units[this.activeUnit].exp_old = this.units[this.activeUnit].exp_curr;
                                        this.units[this.activeUnit].exp_gain = this.computeExperience(this.units[this.activeUnit], this.targetedUnit, false);
                                        this.units[this.activeUnit].exp_curr += this.units[this.activeUnit].exp_gain;
                                        this.units[this.activeUnit].gainedExp = true;
                                        //console.log("Did we gain exp: " + this.units[this.activeUnit].gainedExp);
                                        console.log(this.units[this.activeUnit].name + ' gained ' + this.units[this.activeUnit].exp_gain + ' exp and now has ' + this.units[this.activeUnit].exp_curr + ' exp for current level ' + this.units[this.activeUnit].level + '.');
                                    // Enemy unit was not damaged; player unit gains minimal experience
                                    } else {
                                        this.units[this.activeUnit].exp_old = this.units[this.activeUnit].exp_curr;
                                        this.units[this.activeUnit].exp_gain = 1;
                                        this.units[this.activeUnit].exp_curr += this.units[this.activeUnit].exp_gain;
                                        this.units[this.activeUnit].gainedExp = true;
                                        //console.log("Did we gain exp: " + this.units[this.activeUnit].gainedExp);
                                        console.log(this.units[this.activeUnit].name + ' gained ' + this.units[this.activeUnit].exp_gain + ' exp and now has ' + this.units[this.activeUnit].exp_curr + ' exp for current level ' + this.units[this.activeUnit].level + '.');
                                    }
                                }
                            // Player unit is the defending/assisted unit
                            } //else if(this.targetedUnit.unitType === 'player') {
                                // TODO: Experience gain for player healing/assisting player units
                            //}
                        // Enemy unit is the attacking unit
                        } else if(this.units[this.activeUnit].unitType === 'enemy') {
                            // Player unit is the defending unit
                            if(this.targetedUnit.unitType === 'player') {
                                // Enemy unit was defeated (via counter attack); player unit gains full experience
                                if(this.battleAnimStats.activeUnit.health <= 0) {
                                    this.targetedUnit.exp_old = this.targetedUnit.exp_curr;
                                    this.targetedUnit.exp_gain = this.computeExperience(this.targetedUnit, this.units[this.activeUnit], true);
                                    this.targetedUnit.exp_curr += this.targetedUnit.exp_gain;
                                    this.targetedUnit.gainedExp = true;
                                    console.log(this.targetedUnit.name + ' gained ' + this.targetedUnit.exp_gain + ' exp and now has ' + this.targetedUnit.exp_curr + ' exp for current level ' + this.units[this.activeUnit].level + '.');
                                // Enemy unit is still alive; player gains minimal experience (for successfully defending)
                                } else {
                                    this.targetedUnit.exp_old = this.targetedUnit.exp_curr;
                                    this.targetedUnit.exp_gain = 1;
                                    this.targetedUnit.exp_curr += this.targetedUnit.exp_gain;
                                    this.targetedUnit.gainedExp = true;
                                    console.log(this.targetedUnit.name + ' gained ' + this.targetedUnit.exp_gain + ' exp and now has ' + this.targetedUnit.exp_curr + ' exp for current level ' + this.targetedUnit.level + '.');
                                }
                            }
                        }

                        // Check if player unit gained enough experience to advance to next level
                        // Player unit is the attacking unit
                        if(this.units[this.activeUnit].unitType === 'player') {
                            if(this.units[this.activeUnit].level <= 40 && this.units[this.activeUnit].exp_curr >= this.units[this.activeUnit].exp_levelUp) {
                                this.units[this.activeUnit].leveledUp = true;
                                this.units[this.activeUnit].level++; // Increase level
                                this.units[this.activeUnit].levelUpStats(); // Increase stats
                                this.units[this.activeUnit].exp_curr -= this.units[this.activeUnit].exp_levelUp; // Subtract experience overflow from experience to level up.

                                console.log(this.units[this.activeUnit].name + ' has reached level ' + this.units[this.activeUnit].level + '!');
                            }
                        }

                        // Player unit is the defending/assisted unit
                        if(this.targetedUnit.unitType === 'player') {
                            if(this.targetedUnit.level <= 40 && this.targetedUnit.exp_curr >= this.targetedUnit.exp_levelUp) {
                                this.targetedUnit.leveledUp = true;
                                this.targetedUnit.level++; // Increase level
                                this.targetedUnit.levelUpStats(); // Increase stats
                                this.targetedUnit.exp_curr -= this.targetedUnit.exp_levelUp; // Subtract experience overflow from experience to level up.

                                console.log(this.targetedUnit.name + ' has reached level ' + this.targetedUnit.level + '!');
                            }
                        }

                        // Clean up and end battle animation sequence
                        this.battleState = 'battle_transitionOut';
                        this.fadeInFromBattleAnim();
                    }
                }
                // End battle animation sequence -----------------------------------------------------------------
            } else {
                if(this.battleState === 'shopping' || this.battleState === 'buying' || this.battleState === 'selling') {
                    // Spawn shop overlay and buttons, if necessary
                    if(this.battleState === 'shopping') {
                        if(typeof this.getEntityByName('shop') === 'undefined') {
                            this.spawnEntity(ig.global.EntityOverlay_shop, 0, 0);
                        }

                        if(typeof this.getEntityByName('btn_shop_exit') === 'undefined') {
                            this.spawnEntity(ig.global.EntityButton_shop_exit, this.screen.x + 264, this.screen.y + 132);
                            this.spawnEntity(ig.global.EntityButton_shop_buy, this.screen.x + 164, this.screen.y + 132);
                            this.spawnEntity(ig.global.EntityButton_shop_sell, this.screen.x + 364, this.screen.y + 132);
                        }
                    }

                    if(this.battleState === 'selling') {
                        if(this.soldItemTimer.delta() > 0 && !this.buySellConfirmed){
                            if(typeof ig.game.getEntityByName('btn_shop_exit') === 'undefined') {
                                ig.game.spawnEntity(ig.global.EntityButton_shop_exit, ig.game.screen.x + 264, ig.game.screen.y + 132);
                                ig.game.spawnEntity(ig.global.EntityButton_shop_buy, ig.game.screen.x + 164, ig.game.screen.y + 132);
                                ig.game.spawnEntity(ig.global.EntityButton_shop_sell, ig.game.screen.x + 364, ig.game.screen.y + 132);
                            }
                        }

                        if(typeof this.getEntityByName('btn_shop_item_0') !== 'undefined') {
                            for(i = 0; i < this.itemCatalog.shop1.length; i++) {
                                this.getEntityByName('btn_shop_item_' + i).kill();
                            }
                        }

                        if(typeof this.getEntityByName('btn_item_a0') === 'undefined') {
                            for(i = 0; i < this.units[this.activeUnit].item.length; i++) {
                                this.spawnEntity(ig.global.EntityButton_transparent, this.screen.x + 150, this.screen.y + (i + 1) * 32 + 200, {index: i});
                            }
                        }

                        if(this.soldItem === false){
                            if(this.units[this.activeUnit].selectedItemIndex !== null) {
                                if(this.units[this.activeUnit].item[this.units[this.activeUnit].selectedItemIndex] !== null) {
                                    this.confirmSell = true;
                                    this.buySellConfirmed = true;

                                    if(typeof this.getEntityByName('btn_shop_exit') !== 'undefined') {
                                        this.getEntityByName('btn_shop_exit').kill();
                                    }
                                    if(typeof this.getEntityByName('btn_shop_buy') !== 'undefined') {
                                        this.getEntityByName('btn_shop_buy').kill();
                                    }
                                    if(typeof this.getEntityByName('btn_shop_sell') !== 'undefined') {
                                        this.getEntityByName('btn_shop_sell').kill();
                                    }
                                    if(typeof this.getEntityByName('btn_shop_confirm_sell') === 'undefined'){
                                        this.spawnEntity(ig.global.EntityButton_shop_confirm_sell, this.screen.x + 164, this.screen.y + 132);
                                    }
                                    if(typeof this.getEntityByName('btn_shop_deny_sell') === 'undefined'){
                                        this.spawnEntity(ig.global.EntityButton_shop_deny_sell, this.screen.x + 264, this.screen.y + 132);
                                    }
                                }
                            }
                        }
                    }

                    if(this.battleState === 'buying') {

                        if(this.boughtItemTimer.delta() > 0 && !this.buySellConfirmed){
                            if(typeof ig.game.getEntityByName('btn_shop_exit') === 'undefined') {
                                ig.game.spawnEntity(ig.global.EntityButton_shop_exit, ig.game.screen.x + 264, ig.game.screen.y + 132);
                                ig.game.spawnEntity(ig.global.EntityButton_shop_buy, ig.game.screen.x + 164, ig.game.screen.y + 132);
                                ig.game.spawnEntity(ig.global.EntityButton_shop_sell, ig.game.screen.x + 364, ig.game.screen.y + 132);
                            }
                        }

                        if(typeof this.getEntityByName('btn_item_a0') !== 'undefined') {
                            for(i = 0; i< this.units[this.activeUnit].item.length; i++) {
                                this.getEntityByName('btn_item_a' + i).kill();
                            }
                        }

                        if(typeof this.getEntityByName('btn_shop_item_0') === 'undefined') {
                            for(i = 0; i < this.itemCatalog.shop1.length; i++) {
                                this.spawnEntity(ig.global.EntityButton_shop_item, this.screen.x + 150, this.screen.y + (i + 1) * 32 + 200, {index: i});
                            }
                        }

                        if(this.boughtItem === false){
                            if(this.selectedShopItemIndex !== null) {
                                this.confirmBuy = true;

                                this.buySellConfirmed = true;
                                if(typeof this.getEntityByName('btn_shop_exit') !== 'undefined') {
                                    this.getEntityByName('btn_shop_exit').kill();
                                }
                                if(typeof this.getEntityByName('btn_shop_buy') !== 'undefined') {
                                    this.getEntityByName('btn_shop_buy').kill();
                                }
                                if(typeof this.getEntityByName('btn_shop_sell') !== 'undefined') {
                                    this.getEntityByName('btn_shop_sell').kill();
                                }
                                if(typeof this.getEntityByName('btn_shop_confirm_buy') === 'undefined'){
                                    this.spawnEntity(ig.global.EntityButton_shop_confirm_buy, this.screen.x + 164, this.screen.y + 132);
                                }
                                if(typeof this.getEntityByName('btn_shop_deny_buy') === 'undefined'){
                                    this.spawnEntity(ig.global.EntityButton_shop_deny_buy, this.screen.x + 264, this.screen.y + 132);
                                }
                            } // End if(this.selectedShopItemIndex !== null)
                        }
                    } // End if(this.battleState === 'buying')
                } // End if(this.battleState === 'shopping || this.battleState === 'buying')
            } // End Else

            // Menu escape and clicked unit deselection during player's turn
            if((ig.input.pressed('escape') || this.units[this.activeUnit].unitType !== 'player') && (this.battleState !== 'shopping' && this.battleState !== 'buying' && this.battleState !== 'selling')) {
                if(this.clickedUnit !== null && this.clickedUnit.unitType === 'player' && this.clickedUnit.vel.x === 0 && this.clickedUnit.vel.y === 0) {
                    // Reset inventory/equipment flags
                    this.clickedUnit.selectedItemIndex = null;
                    this.clickedUnit.selectedWeapon = null;
                    this.clickedUnit.isEquipping = false;

                    this.selectedShopItemIndex = null;

                    if(this.clickedUnit.pos !== this.clickedUnit.init_pos) {
                        // User wants to undo/cancel the unit movement
                        this.clickedUnit = this.units[this.activeUnit];
                        this.targetedUnit = this.units[this.activeUnit];
                        this.clickedUnit.pos = this.clickedUnit.init_pos;
                        this.clickedUnit.mov_curr = this.clickedUnit.stat.mov;
                        this.clickedUnit.currentAnim = this.clickedUnit.anims.idle;
                    } else {
                        //this.clickedUnit = null;
                        this.targetedUnit = null;
                    }

                    // Reset battle state and targets
                    this.battleState = null;
                    this.attackTargets = [];
                    this.assistTargets = [];
                    this.tradeTargets = [];
                }

                if(this.item_drop === null) {
                    this.menuVisible = false;
                    ig.global.killAllButtons(ig.Button);
                }
            }

            // Bring up stats screen
            if(ig.input.pressed('SHIFT') && this.battleState !== 'objective' && this.hoveredUnit !== null && this.units[this.activeUnit].unitType === 'player' && this.units[this.activeUnit].vel.x === 0 && this.units[this.activeUnit].vel.y === 0 && !this.menuVisible) {
                // Storing the hovered unit within another variable prevents a few bugs, such as:
                //  * After bringing up the status screen, if the player presses "shift" after moving the cursor, this.hoveredUnit would be null.
                //  * Prevents bugs when closing the status screen.
                this.tempUnit = this.hoveredUnit;
                this.menuVisible = false;
                this.battleState = 'stats';
            }

            // Bring up objective screen
            if(ig.input.pressed('menu') && this.battleState !== 'stats' && this.battleState !== 'player_phase' && this.units[this.activeUnit].unitType === 'player' && this.units[this.activeUnit].vel.x === 0 && this.units[this.activeUnit].vel.y === 0 && !this.menuVisible) {
                this.menuVisible = false;
                this.battleState = 'objective';
            }

            // Menu to prematurely end player's phase (end all player's unit turn)
            if(ig.input.state('rightClick') && this.battleState !== 'objective' && !this.menuVisible && this.hoveredUnit === null && this.units[this.activeUnit].unitType === 'player' && this.units[this.activeUnit].vel.x === 0 && this.units[this.activeUnit].vel.y === 0) {
                this.menuVisible = true;
                this.spawnEntity(ig.global.EntityButton_endturn, this.screen.x + 32, this.screen.y + 32);
                //this.spawnEntity(ig.global.EntityButton_suspend, this.screen.x + 32, this.screen.y + 64);
            }

            this.camera.max = {
                x: this.collisionMap.width * ig.global.tilesize - ig.system.width,
                y: this.collisionMap.height * ig.global.tilesize - ig.system.height
            };

            // Prevent camera from panning off of battle animation overlay
            // Disable camera toggle while in battle animation
            var unitFocus;
            if(this.battleState !== 'battle_start' && !this.menuVisible) {
                /* Lock the camera under the following conditions:
                    * If we are trading.
                    * If we are showing the player phase/enemy phase modal. This allows the camera
                      to snap to the initial positions first, then allow free movement.
                    * If a unit is moving, don't let the camera move.
                    * If any menu is visable.
                    * If we are showing the player phase/enemy phase modal. This allows the camera
                      to snap to the initial positions first, then allow free movement.
                    * If a unit is moving, don't let the camera move.
                    * If any menu is visable.
                */
                if(this.menuVisible || this.units[this.activeUnit].unitType === 'enemy' || this.battleState === 'player_phase' || this.battleState === 'enemy_phase' || this.battleState === 'trade' || this.battleState === 'trading' || this.battleState === 'stats' || this.units[this.activeUnit].vel.x !== 0 || this.units[this.activeUnit].vel.y !== 0){
                    this.freeCamera = false;
                } else {
                    this.freeCamera = true;
                }

                // Make screen follow mouse cursor
                if(this.freeCamera) {
                    this.camera.follow(this.pointer);
                // Make screen follow active unit
                } else {
                    unitFocus = this.units[this.activeUnit];
                    if(!this.units[this.activeUnit]._killed) {
                        this.camera.follow(unitFocus);
                    }
                }
            }

            // Map objective has not been met
            if(ig.global.objective_triggered === false) {
                // Check end battle map condition
                if(this.units[this.activeUnit].unitType === 'player' && this.menuVisible === false && this.levels[this.director.currentLevel].objective.apply(null, this.levels[this.director.currentLevel].objectiveArgs)) {
                    ig.global.objective_triggered = true;

                    console.log('Leaving battle mode.');
                    ig.music.fadeOut(2);
                    this.fadeIn(function() {
                        ig.system.setGame(ig.CutScene);
                    });
                }
            // End battle
            }
            // We actually don't need to snap the camera back to the player to finish the map.
            /*
            } else {
                // Stop player's movement, wait for fade transition to finish, and leave battlefield
                unitFocus.pos = ig.global.alignToGrid(unitFocus.pos.x, unitFocus.pos.y);
                unitFocus.vel = {x: 0, y: 0};
            }*/

            this.atmosphere.update();
        }, // End update method

        // Create fade effect to transition from game screen to battlefield
        fadeIn: function(callback) {
            this.screenFadeIn = new ig.ScreenFader({
                fade: 'in',
                speed: 4,
                callback: typeof(callback) === 'function' ? callback : null,
                delayBefore: 1,
                delayAfter: 1
            });
        }, // End fadeIn method

        // Create fade effect to transition from battlefield to battle animation
        fadeInToBattleAnim: function() {
            ig.music.fadeOutAndPause(1);

            this.screenFadeInToBattleAnim = new ig.ScreenFader({
                fade: 'in',
                speed: 4,
                delayBefore: 1,

                callback: function() {
                    this.battleState = 'battle_prepare';
                    if(this.units[this.activeUnit].name === 'Nergal' || this.targetedUnit.name === 'Nergal'){
                        this.auxMusic.play('nergal_battle');
                    } else if (this.units[this.activeUnit].name === 'Lyn' || this.targetedUnit.name === 'Lyn'
                            || this.units[this.activeUnit].name === 'Hector' || this.targetedUnit.name === 'Hector'){
                        this.auxMusic.play('boss_theme');
                    } else if (this.units[this.activeUnit].name === 'Zephiel' || this.targetedUnit.name === 'Zephiel'){
                        this.auxMusic.play('zephiel_battle');
                    } else
                        this.auxMusic.play('battle');

                    this.fadeOutAfterEffect();
                    this.screenFadeInToBattleAnim = null;
                }
            });
        }, // End fadeInToBattleAnim method

        // Create fade effect to transition from battle animation to battlefield
        fadeInFromBattleAnim: function() {
            this.auxMusic.fadeOut(2);

            this.screenFadeInFromBattleAnim = new ig.ScreenFader({
                fade: 'in',
                speed: 4,
                delayBefore: 2,
                callback: function() {
                    this.units[this.activeUnit].receiveDamage(Math.abs(this.units[this.activeUnit].health - this.battleAnimStats.activeUnit.health), this.targetedUnit);
                    this.targetedUnit.receiveDamage(Math.abs(this.targetedUnit.health - this.battleAnimStats.targetedUnit.health), this.units[this.activeUnit]);

                    this.battleAnimControllers.gui.kill();
                    this.battleAnimControllers.effects.kill();
                    this.battleAnimControllers.background.kill();
                    this.battleAnimControllers.gui = null;
                    this.battleAnimControllers.effects = null;
                    this.battleAnimControllers.background = null;

                    this.attackQueue[0].kill(); // Kill unit animation entity
                    this.attackQueue[1].kill();  // Kill unit animation entity
                    if(this.attackQueue.length === 3) {
                        this.attackQueue[2].kill();  // Kill unit animation entity
                    }
                    this.attackQueue = []; // Reset attack queue
                    this.attackQueueIndex = 0; // Reset attack queue index

                    this.battleAnimStats.activeUnit = null;
                    this.battleAnimStats.targetedUnit = null;

                    if(this.battleState === 'battle_transitionOut') {
                        this.battleState = null; // End battle animation (stop displaying screen text)
                    }

                    // Do not end active unit's turn (enemy or player) if an item drop exists.
                    if((this.item_drop !== null || this.units[this.activeUnit].gainedExp || this.targetedUnit.gainedExp || this.units[this.activeUnit].leveledUp || this.targetedUnit.leveledUp) && (this.units[this.activeUnit].unitType === 'player' || this.units[this.activeUnit].unitType === 'enemy')) {
                        this.units[this.activeUnit].turnUsed = false;
                    } else {
                        this.units[this.activeUnit].turnUsed = true;
                    }

                    if(this.units[this.activeUnit].unitType === 'player') {
                        ig.music.play(this.levels[ig.global.currentLevel].music);
                    } else if(this.units[this.activeUnit].unitType === 'enemy') {
                        ig.music.play('augustine_army');
                    }

                    this.fadeOutAfterEffect();
                    this.menuVisible = false;
                    this.screenFadeInFromBattleAnim = null;
                    //console.log('Fading out');
                }
            });
        }, // End fadeInFromBattleAnim method

        fadeOutAfterEffect: function() {
            this.screenFadeOutAfterEffect = new ig.ScreenFader({
                fade: 'out',
                speed: 4,
                callback: function() {
                    this.screenFadeOutAfterEffect = null;

                    if(!this.displayedItem && this.itemDropObject){
                        this.displayedItemTimer.reset();
                        this.battleState = 'item_display';
                    } else if(
                        (this.units[this.activeUnit].unitType === 'player' && this.units[this.activeUnit].gainedExp === true) ||
                        (this.targetedUnit && this.targetedUnit.unitType === 'player' && this.targetedUnit.gainedExp === true))
                        {
                            this.expTimer.reset();
                            this.battleState = 'exp';
                        }
                    }
            });
        }, // End fadeInToBattleAnim method

        //######################################################################
        //# HELPER METHODS                                                     #
        //######################################################################
        /**
         *  number computeExperience(object attacker, object target, bool killed)
         *  -----
         *  Compute experience gained.
         */
        computeExperience: function(attacker, target, killed) {
            var exp = killed ? 50 : Math.floor((50 + attacker.level + target.level ) / 4);
            // var exp = killed ? Math.floor((32 + attacker.level + target.level) / 2) : Math.floor((32 + attacker.level + target.level ) / 4);
            return exp > 100 ? 100 : exp;
        },

        /**
         * undefined applyTerrainBonuses(object entity)
         * -----
         * Method to apply terrain bonuses on entity
        */
        applyTerrainBonuses: function(entity){
            // 1. Player starts on some arbitrary tile.
            // 2. Player moves to some tile.
            // 3. We need to apply the terrain bonuses.

            // Step 1. Remove any existing terrain bonuses and clear storage
            entity.stat.def -= entity.terrainMod.def;
            entity.derived_stats.evade -= entity.terrainMod.avoid;

            // Clear our the bonus so we don't keep stacking it in the future
            entity.terrainMod.avoid = 0;
            entity.terrainMod.def = 0;

            // Step 2. Get the current terrain properties
            var activeUnit_terrain = ig.game.getTerrain(entity.pos.x, entity.pos.y);

            // Step 3. Store terrain bonus for active unit
            entity.terrainMod.avoid += activeUnit_terrain.avoid;
            entity.terrainMod.def += activeUnit_terrain.def;

            // Step 4. Apply the bonuses
            entity.stat.def += entity.terrainMod.def;
            entity.derived_stats.evade += entity.terrainMod.avoid;
        },

        /**
         *  undefined recomputeStats(object entity boolean clear)
         *  -----
         *  Method to compute an entity's stats in one go.
         *
         *  atk = base str + item atk power
         *  hit_rate = base_skl / 2 + base_luk / 2 + weapon_hit_rate
         *  crit_rate = base_skl / 2 + weapon_crit_rate
         *  entity_attack_speed =
         *      If weight of unit is greater than weapon equipped, return base spd
         *      Otherwise, Attack speed = base spd - (weapon weight - player base wt stat)
         *  evade = attack_speed * 2 + base spd
         */
        recomputeStats: function(entity, clear) {
            var equippedItem;
            // No equipped item
            if(clear) {
                equippedItem = {atk: 0, hit: 0, crit: 0, wt: 0, range: 0, area: 0};
            }
            // Equipped item
            if(entity.item[0] !== null && entity.item[0].type === 'equip' && this.isValidWeapon(entity.item[0].affinity, entity) && !clear) {
                entity.hasEquippedItem = true;
                equippedItem = {
                    atk: entity.item[0].atk,
                    hit: entity.item[0].hit,
                    crit: entity.item[0].crit,
                    wt: entity.item[0].wt,
                    range: typeof entity.item[0].range === 'function' ? entity.item[0].range(entity) : entity.item[0].range,
                    area: typeof entity.item[0].area === 'function' ? entity.item[0].area(entity) : entity.item[0].area
                };
            } else {
                equippedItem = {atk: 0, hit: 0, crit: 0, wt: 0, range: 0, area: 0};
                entity.hasEquippedItem = false;
            }

            if(typeof equippedItem !== 'undefined') {
                entity.derived_stats.atk          = Math.floor(entity.stat.str + equippedItem.atk);
                entity.derived_stats.hit_rate     = Math.floor(entity.stat.skl / 2 + entity.stat.luk / 2 + equippedItem.hit);
                entity.derived_stats.crit_rate    = Math.floor(entity.stat.skl / 2 + equippedItem.crit);
                entity.derived_stats.attack_speed = entity.stat.wt < equippedItem.wt ? Math.floor(entity.stat.spd - (equippedItem.wt - entity.stat.wt)) : Math.floor(entity.stat.spd);
                entity.derived_stats.evade        = Math.floor(entity.derived_stats.attack_speed * 2 + entity.stat.spd) + entity.terrainMod.avoid;
                entity.atk_dist                   = Math.floor(equippedItem.range);
                entity.atk_area                   = Math.floor(equippedItem.area);
            }

            // Post-computation checks (clamp value at 0 if negative)
            if(entity.derived_stats.atk < 0)          { entity.derived_stats.atk = 0;          }
            if(entity.derived_stats.hit_rate < 0)     { entity.derived_stats.hit_rate = 0;     }
            if(entity.derived_stats.crit_rate < 0)    { entity.derived_stats.crit_rate = 0;    }
            if(entity.derived_stats.attack_speed < 0) { entity.derived_stats.attack_speed = 0; }
            if(entity.derived_stats.evade < 0)        { entity.derived_stats.evade = 0;        }
            if(entity.atk_dist < 0)                   { entity.atk_dist = 0;                   }
            if(entity.atk_area < 0)                   { entity.atk_area = 0;                   }

        },

        /**
         * boolean isValidWeapon(string value, object entity)
         * -----
         * Checks if the selected weapon exists within entity property "validWeapon"
        */
        isValidWeapon: function(value, entity) {
            return entity.validWeapon.indexOf(value) >= 0 ? true : false;
        },

        /**
         *  number weaponTriangle(object attacker, object defender)
         *  -----
         *  Compute weapon and magic triangle bonuses and penalties.
         */
        weaponTriangle: function(attacker, defender) {
            // Both units' weapon slot is not null and the weapon has an affinity
            if(attacker.item[0] !== null && defender.item[0] !== null && typeof attacker.item[0].affinity !== 'undefined' && typeof defender.item[0].affinity !== 'undefined') {
                // Compute weapon triangle for melee weapons -------------------
                if(attacker.item[0].affinity === 'sword' && defender.item[0].affinity === 'axe') { // Sword strong against Axe
                    return attacker.mod.hit + 15;
                } else if(attacker.item[0].affinity === 'sword' && defender.item[0].affinity === 'lance') { // Sword weak against Lance
                    return attacker.mod.hit - 15;
                } else if(attacker.item[0].affinity === 'axe' && defender.item[0].affinity === 'lance') { // Axe strong against Lance
                    return attacker.mod.hit + 15;
                } else if(attacker.item[0].affinity === 'axe' && defender.item[0].affinity === 'sword') { // Axe weak against Sword
                    return attacker.mod.hit - 15;
                } else if(attacker.item[0].affinity === 'lance' && defender.item[0].affinity === 'sword') { // Lance strong against Sword
                    return attacker.mod.hit + 15;
                } else if(attacker.item[0].affinity === 'lance' && defender.item[0].affinity === 'axe') { // Lance weak against Axe
                    return attacker.mod.hit - 15;
                }
                // Compute magic triangle for magic weapons --------------------
                /*
                } else if(attacker.item[0].affinity === 'anima' && defender.item[0].affinity === 'light') { // Anima strong against Light
                } else if(attacker.item[0].affinity === 'anima' && defender.item[0].affinity === 'dark' ) { // Anima weak against Dark
                } else if(attacker.item[0].affinity === 'light' && defender.item[0].affinity === 'dark' ) { // Light strong against Dark
                } else if(attacker.item[0].affinity === 'light' && defender.item[0].affinity === 'anima') { // Light weak against Anima
                } else if(attacker.item[0].affinity === 'dark'  && defender.item[0].affinity === 'anima') { // Dark strong against Anima
                } else if(attacker.item[0].affinity === 'dark'  && defender.item[0].affinity === 'light') { // Dark weak against Light
                */
                // -------------------------------------------------------------
                else {
                    return attacker.mod.hit; // Same or unrecognized weapon affinity
                }
            } else {
                return attacker.mod.hit; // No weapon equipped
            }
        },

        dropCheck: function() {
            if(this.item_drop !== null) {
                var i;

                this.menuVisible = true;

                if(this.units[this.activeUnit].unitType === 'player') {
                    for(i = 0; i < this.units[this.activeUnit].item.length; i++) {
                        this.spawnEntity(ig.global.EntityButton_inventory_item, this.screen.x + 32, this.screen.y + (i + 1) * 32, {index: i});
                    }
                } else if(this.units[this.activeUnit].unitType === 'enemy') {
                    for(i = 0; i < this.targetedUnit.item.length; i++) {
                        this.spawnEntity(ig.global.EntityButton_inventory_item, this.screen.x + 32, this.screen.y + (i + 1) * 32, {index: i});
                    }
                }
                this.battleState = 'discarding';
                this.spawnEntity(ig.global.EntityButton_dropped_item, this.screen.x + 32, this.screen.y + (i + 3) * 32);
            }
        },

        /**
         *  undefined swapItems(object entity, index_1, index_2)
         *  -----
         *  Swaps items in a unit's inventory.
         */
        swapItems: function(entity, index_1, index_2) {
            var item_temp = entity.item[index_1];
            entity.item[index_1] = entity.item[index_2];
            entity.item[index_2] = item_temp;

            var uses_temp = entity.item_uses[index_1];
            entity.item_uses[index_1] = entity.item_uses[index_2];
            entity.item_uses[index_2] = uses_temp;

            //console.log('Swapping Items: ' + index_1 + ' <--> ' + index_2);
        },

        /**
         * number generateRandomInt(number min, number max)
         * ------
         * Returns a random number between min and max
        */
        generateRandomInt: function(min, max){
            return Math.floor(Math.random() * (max - min + 1)) + min;
        },

        /**
         * object generateRandomItem()
         * ------
         * Returns an item from the item catalog based on random choice
        */
        generateRandomItem: function(){
            var itemClasses = ['sword', 'lance', 'axe', 'tome', 'staff', 'item'];
            var choice = Math.floor(Math.random() * itemClasses.length);
            var itemChoice = itemClasses[choice];
            var item;
            if (itemChoice === 'sword'){
                item = ig.game.itemCatalog['sword' + this.generateRandomInt(1, 10).toString()];
            }
            else if (itemChoice === 'lance'){
                item = ig.game.itemCatalog['lance' + this.generateRandomInt(1, 7).toString()];
            }
            else if (itemChoice === 'axe'){
                item = ig.game.itemCatalog['axe' + this.generateRandomInt(1, 5).toString()];
            }
            else if (itemChoice === 'tome'){
                item = ig.game.itemCatalog['tome' + this.generateRandomInt(1, 3).toString()];
            }
            else if (itemChoice === 'staff'){
                item = ig.game.itemCatalog['staff1'];
            }
            else if (itemChoice === 'item'){
                item = ig.game.itemCatalog['item' + this.generateRandomInt(1, 4).toString()];
            }
            return item;
        },

        /**
         *  undefined tradeItems(object a, object t, number index_1, number_index_2)
         *  -----
         *  Trade items between two units' unventory.
         */
        tradeItems: function(a, t, index_1, index_2) {
            // Swap inventory items
            var item_temp = a.item[index_1];
            a.item[index_1] = t.item[index_2];
            t.item[index_2] = item_temp;

            // Swap item usage
            var uses_temp = a.item_uses[index_1];
            a.item_uses[index_1] = t.item_uses[index_2];
            t.item_uses[index_2] = uses_temp;
            this.recomputeStats(a);
            this.recomputeStats(t);
        },

        /**
         *  number getFreeSlot(object entity)
         *  -----
         *  Get unit's first available free slot, if one exists. Returns null if
         *  the unit has no free slots available.
         */
        getFreeSlot: function(entity) {
            for(var i = 0; i < entity.item.length; i++) {
                if(entity.item[i] === null) {
                    return i; // Found a free slot, return slot index
                }
            }

            return null; // No free slot found, return null
        },

        /**
         *  undefined useItemDurability(object entity, number itemIndex)
         *  -----
         *  Decrement specified slot's item usage by 1 (auto-destroy item if 0 usage remaining).
         */
        useItemDurability: function(entity, itemIndex) {
            entity.item_uses[itemIndex]--;
            if(entity.item_uses[itemIndex] <= 0) {
                console.log(entity.item[itemIndex].name + ' has exhausted its uses.');
                entity.item[itemIndex] = null;
                entity.item_uses[itemIndex] = 0;
            }
        },

        /**
         *  undefined clearMod(object entity)
         *  -----
         *  Method to reset all of the values inside the mod property.
         */
        clearMod: function(entity) {
            entity.mod.atk   = 0;
            entity.mod.hit   = 0;
            entity.mod.crit  = 0;
            entity.mod.wt    = 0;
            entity.mod.evade = 0;
        },

        /**
         *  number computeBattleNormalHitChance(object attacker, object target)
         *  -----
         *  Compute attacker's hit chance for normal attack against target.
         */
        computeBattleNormalHitChance: function(attacker, target) {
            return attacker.derived_stats.hit_rate - target.derived_stats.evade > 0 ? attacker.derived_stats.hit_rate - target.derived_stats.evade : 0;

        },

        /**
         *  number computeBattleNormalDamage(object attacker, object target)
         *  -----
         *  Compute attacker's damage for normal attack against target.
         */
        computeBattleNormalDamage: function(attacker, target) {
            return attacker.derived_stats.atk - target.stat.def > 0 ? attacker.derived_stats.atk - target.stat.def : 0;
        },

        /**
         *  number computeBattleCritChance(object attacker, object target)
         *  -----
         *  Compute attacker's damage for critical attack against target.
         */
        computeBattleCritChance: function(attacker, target) {
            return attacker.derived_stats.crit_rate - target.stat.luk > 0 ? attacker.derived_stats.crit_rate - target.stat.luk : 0;
        },

        /**
         *  number computeBattleCritDamage(object attacker, object target)
         *  -----
         *  Compute attacker's hit chance for critical attack against target.
         */
        computeBattleCritDamage: function(attacker, target) {
            return attacker.derived_stats.atk - target.stat.def > 0 ? (attacker.derived_stats.atk - target.stat.def) * 3 : 0;
        },

        /**
         *  undefined displayBattleScreenEffect(object entity)
         *  ----
         *  Triggers the battle screen effect layer to play the appropriate
         *  screen animation effect based on the weapon eqipped.
         */
        displayBattleScreenEffect: function(entity) {
            // Play appropriate screen animation effect based on attacker's weapon equipped
            if(entity.item[0] === this.itemCatalog.tome1) {
                this.battleAnimControllers.effects.currentAnim = this.battleAnimControllers.effects.anims.fimbulvetr;
                this.battleAnimControllers.effects.currentAnim.rewind();
            } else if(entity.item[0] === this.itemCatalog.tome3) {
                this.battleAnimControllers.effects.currentAnim = this.battleAnimControllers.effects.anims.excalibur;
                this.battleAnimControllers.effects.currentAnim.rewind();
            } else if(entity.item[0] === this.itemCatalog.tome2) {
                this.battleAnimControllers.effects.currentAnim = this.battleAnimControllers.effects.anims.forblaze;
                this.battleAnimControllers.effects.currentAnim.rewind();
            } else if(entity.item[0] === this.itemCatalog.tome4) {
                this.battleAnimControllers.effects.currentAnim = this.battleAnimControllers.effects.anims.ereskigal;
                this.battleAnimControllers.effects.currentAnim.rewind();
            }

            // Flip screen effect based on if attacker is player or enemy
            if(entity.unitType === 'player') {
                this.battleAnimControllers.effects.flip = false;
            } else if(entity.unitType === 'enemy') {
                this.battleAnimControllers.effects.flip = true;
            }
        },

        /**
         *  object getTerrain(number pos_x, number pos_y)
         *  -----
         *  Gets the terrain object data at the specified location.
         */
        getTerrain: function(pos_x, pos_y) {
            var tile_pos = {
                x: Math.floor((pos_x + ig.global.tilesize / 2) / ig.global.tilesize),
                y: Math.floor((pos_y + ig.global.tilesize / 2) / ig.global.tilesize)
            };
            return this.terrain[this.backgroundMaps[0].data[tile_pos.y][tile_pos.x]];
        },
        //######################################################################

        draw: function() {
            if(this.screenshakeIntensity === 0) {
                this.parent();
            } else {
                // Modified sign/signum function. Extracts the sign of a real number
                // (returns -1 if negative or +1 if positive). If 0, return +1 (positive).
                var sgn = function(num) {
                    return !num ? (num > 0) - (num < 0) : 1;
                };

                // Modified screen shaking effect (no plugins)
                //   http://impactjs.com/forums/code/plugin-to-shake-the-screen/page/1
                ig.system.context.save();
                    // Screen shake intensity
                    //   x: -5 px or +5 px
                    //   y: -5 px OR +5 px
                    ig.system.context.translate(
                        this.screenshakeIntensity * sgn(Math.random() - 0.5),
                        this.screenshakeIntensity * sgn(Math.random() - 0.5)
                    );
                    this.parent();
                ig.system.context.restore();
                this.screenshakeIntensity = 0;
            }

            this.atmosphere.draw();

            var a, t;

            // Show discard help diaglogue
            if(this.battleState === 'discarding'){
                this.discardDialogue.draw(30, 340);
                this.font20.black.draw('Select an item', 60, 360);
                this.font20.black.draw('to', 60, 395);
                this.font20.red.draw('discard', 90, 395);
                this.font20.black.draw('.', 170, 395);
            }

            // Show inventory help diagogue
            if(this.battleState === 'inventory'){
                this.discardDialogue.draw(30, 340);
                this.font20.black.draw('Select an item', 60, 360);
                this.font20.black.draw('to', 60, 380);
                this.font20.green.draw('equip', 90, 380);
                this.font20.black.draw('or', 160, 380);
                this.font20.green.draw('use', 60, 400);
                this.font20.black.draw('.', 100, 400);
            }

            // Show the player what item they received
            if(this.battleState === 'item_display'){
                if(this.displayedItemTimer.delta() < 0){
                    if(!this.playingGetItemSFX){
                        this.playingGetItemSFX = true;
                        this.sfx.play('get_item');
                    }
                    this.itemDisplayModal.draw(120, 240);
                    this.font20.green.draw('Received ', 175, 246);
                    this.itemDropObject.icon.draw(300, 247);
                    this.font20.green.draw(this.itemDropObject.name, 332, 246);
                }
                if(this.displayedItemTimer.delta() > 0){
                    this.displayedItem = true;
                    this.battleState = null;
                    this.playingGetItemSFX = false;
                    if((this.units[this.activeUnit].unitType === 'player' && this.units[this.activeUnit].gainedExp === true) ||
                        (this.targetedUnit && this.targetedUnit.unitType === 'player' && this.targetedUnit.gainedExp === true)){
                        this.expTimer.reset();
                        this.battleState = 'exp';
                    }
                }
            }

            // Draw text for shop overlay based on battle state
            if(this.battleState === 'shopping'){
                this.fontContent20.draw('Welcome! Are you buying or selling?', 175, 50);
                this.font30.default.draw(ig.global.gold, 505, 155);
            }

            if (this.battleState === 'buying'){
                if(this.confirmBuy){
                    this.fontContent20.draw('Buy ' + ig.game.itemCatalog.shop1[ig.game.selectedShopItemIndex].name + ' for ' + ig.game.itemCatalog.shop1[ig.game.selectedShopItemIndex].cost + '?', 175, 50);
                }

                if(this.lowMoney){
                    if(this.lowMoneyTimer.delta() < 0){
                        this.fontContent20.draw('You do not have enough money!', 175, 50);
                    }
                    if(this.lowMoneyTimer.delta() > 0){

                        this.lowMoney = false;
                    }
                }

                if(this.fullInventory){
                    if(this.fullInventoryTimer.delta() < 0){
                        this.fontContent20.draw('Inventory full!', 175, 50);
                    }
                    if(this.fullInventoryTimer.delta() > 0){

                        this.fullInventory = false;
                    }
                }

                if(!this.boughtItem && !this.confirmBuy && !this.lowMoney && !this.fullInventory){
                    this.fontContent20.draw('Click an item to purchase it.', 175, 50);
                }

                this.font30.default.draw(ig.global.gold, 505, 155);
                if(this.boughtItemTimer.delta() < 0){
                    if(this.boughtItem && !this.confirmBuy && !this.lowMoney && !this.fullInventory){
                        this.fontContent20.draw('Thank you for purchasing ' + this.boughtItemName + '.', 175, 50);
                    }
                }

                if(this.boughtItemTimer.delta() > 0){
                    this.boughtItem = false;
                }
            }

            if (this.battleState === 'selling'){
                if(this.confirmSell){
                    this.fontContent20.draw('Sell ' + this.units[this.activeUnit].item[this.units[this.activeUnit].selectedItemIndex].name + ' for ' + this.units[this.activeUnit].item[this.units[this.activeUnit].selectedItemIndex].cost + '?', 175, 50);
                }

                if(!this.soldItem && !this.confirmSell){
                    this.fontContent20.draw('Click an item to sell it.', 175, 50);
                }

                this.font30.default.draw(ig.global.gold, 505, 155);
                if(this.soldItemTimer.delta() < 0){
                    if(this.soldItem){
                        this.fontContent20.draw('Thank you for selling ' + this.soldItemName + '.', 175, 50);
                    }
                }

                if(this.soldItemTimer.delta() > 0){
                    this.soldItem = false;
                }
            }

            // We haven't displayed the player phase modal for this turn
            if(this.battleState === 'player_phase' && this.displayedPlayerPhaseModal === false) {
                // Timer is running, draw modal
                if(this.phaseTimer.delta() < 0) {
                    this.playerPhaseModal.draw(0, 250);
                }
                if(this.phaseTimer.delta() > 0) {
                    // We finished drawing, reset states
                    this.battleState = null;
                    this.playingTurnSFX = false;
                    this.displayedPlayerPhaseModal = true;
                }
            }

            // We haven't displayed the enemy phase modal for this turn
            if(this.battleState === 'enemy_phase' && this.displayedEnemyPhaseModal === false) {
                if(this.enemyPhaseTimer.delta() < 0) {
                    this.enemyPhaseModal.draw(0, 250);
                }
                if(this.enemyPhaseTimer.delta() > 0) {
                    this.battleState = null;
                    this.playingTurnSFX = false;
                    this.displayedEnemyPhaseModal = true;
                }
            }

            if(typeof this.getEntityByName('btn_item_a0') && this.battleState === 'trading') {
                a = this.units[this.activeUnit];
                t = this.targetedUnit;

                if(typeof a.statMugshot !== 'undefined') {
                    a.mugshot.draw(160, 32);
                }

                if(typeof t.statMugshot !== 'undefined') {
                    t.mugshot.draw(400, 32);
                }

                this.helpDialogue.draw(0, 450);
                this.font20.black.draw('Click one slot in each inventory to trade items.', 90, 455);
            }

            // Draw experience modal
            if(this.battleState === 'exp') {
                if(this.expTimer.delta() < 1) {
                    // Align modal to center of game screen
                    this.expModal.draw(ig.system.width / 2 - 192, ig.system.height / 2 - 31);

                    var expNext = 1;
                    if(this.units[this.activeUnit].unitType === 'player') {
                        var expCurr = this.units[this.activeUnit].exp_old + this.units[this.activeUnit].exp_gain * ((this.exp_time + (this.expTimer.delta() < 0 ? this.expTimer.delta() : 0)) / this.exp_time);
                    } else if(this.targetedUnit.unitType === 'player') {
                        var expCurr = this.targetedUnit.exp_old + this.targetedUnit.exp_gain * ((this.exp_time + (this.expTimer.delta() < 0 ? this.expTimer.delta() : 0)) / this.exp_time);
                    }

                    // Determine if current player unit is active unit or targeted unit
                    if(this.units[this.activeUnit].unitType === 'player') {
                        expNext = this.units[this.activeUnit].exp_levelUp;
                    } else if(this.targetedUnit.unitType === 'player') {
                        expNext = this.targetedUnit.exp_levelUp;
                    }

                    // Experience bar
                    ig.system.context.fillStyle = 'rgb(75, 255, 75)';
                    ig.system.context.beginPath();
                        ig.system.context.rect(
                            ig.system.width / 2 - 168,
                            ig.system.height / 2 - 3,
                            269 * ((expCurr % expNext) / expNext),
                            10
                        );
                    // this.sfx.play('exp');
                    ig.system.context.closePath();
                    ig.system.context.fill();

                    // Numerical experience
                    this.font20.default.draw(Math.floor(expCurr % expNext), ig.system.width / 2 + 140, ig.system.height / 2 - 9);

                } else if(this.expTimer.delta() > 1.0) {
                    // Did we level up?
                    if((this.units[this.activeUnit].unitType === 'player' && this.units[this.activeUnit].leveledUp === true) ||
                        (this.targetedUnit && this.targetedUnit.unitType === 'player' && this.targetedUnit.leveledUp === true))
                    {
                        if(this.units[this.activeUnit].unitType === 'player'){
                            this.units[this.activeUnit].exp_old = 0;
                            this.units[this.activeUnit].exp_gain = 0;
                            this.units[this.activeUnit].gainedExp = false;
                            this.levelUpTimer.reset();
                            this.levelUpMessageTimer.reset();
                            this.battleState = 'levelup';
                        } else if (this.targetedUnit.unitType === 'player'){
                            this.targetedUnit.exp_old = 0;
                            this.targetedUnit.exp_gain = 0;
                            this.targetedUnit.gainedExp = false;
                            this.levelUpTimer.reset();
                            this.levelUpMessageTimer.reset();
                            this.battleState = 'levelup';
                        }
                    } else {
                        // We didn't level up, player is active
                        if(this.units[this.activeUnit].unitType === 'player'){
                            this.units[this.activeUnit].gainedExp = false;
                            this.battleState = null;
                            if(this.item_drop !== null){
                                this.dropCheck();
                            } else {
                                this.units[this.activeUnit].turnUsed = true;
                            }

                        } else if (this.targetedUnit.unitType === 'player'){
                            this.targetedUnit.gainedExp = false;
                            this.battleState = null;
                            if(this.item_drop !== null){
                                this.dropCheck();
                            } else {
                                this.units[this.activeUnit].turnUsed = true;
                            }
                        }
                    }
                }
            }

            // LEVEL UP SYSTEM
            if(this.battleState === 'levelup'){
                if(this.levelUpTimer.delta() < 0){
                    if(this.units[this.activeUnit].unitType === 'player'){
                        // Display level up message
                        if(this.levelUpMessageTimer.delta() < 0){
                            this.levelUpMessage.draw(20, 200);
                            if(!this.playingLevelUpSFX){
                                this.playingLevelUpSFX = true;
                                this.sfx.play('level_up');
                            }
                        }
                        // Finished displaying level up message.
                        // Draw level up modal
                        if(this.levelUpMessageTimer.delta() > 0){
                            this.levelUpModalTimer.reset();
                            this.levelUpBonusTimer.reset();
                            if(this.levelUpModalTimer.delta() < 0){
                                this.levelUpModal.draw(20, 250);
                                this.levelUpTop.draw(20, 150);
                                // Draw unit name
                                this.font30.default.draw(this.units[this.activeUnit].name, 40, 160);
                                // Draw unit level
                                this.font30.default.draw(this.units[this.activeUnit].level - 1, 295, 160);
                                this.font30.green.draw('->', 315, 165);
                                this.font30.default.draw(this.units[this.activeUnit].level, 340, 160);
                                this.levelUpBonus.draw(360, 140);
                                // Draw unit hp
                                this.font30.default.draw(this.units[this.activeUnit].health_max, 120, 270);
                                // Draw unit str
                                this.font30.default.draw(this.units[this.activeUnit].stat.str, 120, 315);
                                // Draw unit skl
                                this.font30.default.draw(this.units[this.activeUnit].stat.skl, 120, 360);
                                // Draw unit spd
                                this.font30.default.draw(this.units[this.activeUnit].stat.spd, 120, 405);
                                // Draw unit luk
                                this.font30.default.draw(this.units[this.activeUnit].stat.luk, 320, 270);
                                // Draw unit def
                                this.font30.default.draw(this.units[this.activeUnit].stat.def, 320, 315);
                                // Draw unit res
                                this.font30.default.draw(this.units[this.activeUnit].stat.res, 320, 360);
                                // Draw unit con
                                this.font30.default.draw(this.units[this.activeUnit].stat.wt, 320, 405);
                                // Draw unit mugshot
                                this.units[this.activeUnit].mugshot.draw(440, 280);
                                // Did we level up hp?
                                if(this.units[this.activeUnit].levelUpBonuses.hp > 0){
                                    this.levelUpBonus.draw(155, 250);
                                }

                                // Did we level up str?
                                if(this.units[this.activeUnit].levelUpBonuses.str > 0){
                                    this.levelUpBonus.draw(155, 295);
                                }
                                // Did we level up skl?
                                if(this.units[this.activeUnit].levelUpBonuses.skl > 0){
                                    this.levelUpBonus.draw(155, 340);
                                }
                                // Did we level up spd?
                                if(this.units[this.activeUnit].levelUpBonuses.spd > 0){
                                    this.levelUpBonus.draw(155, 385);
                                }
                                // Did we level up luk?
                                if(this.units[this.activeUnit].levelUpBonuses.luk > 0){
                                    this.levelUpBonus.draw(350, 250);
                                }
                                // Did we level up def?
                                if(this.units[this.activeUnit].levelUpBonuses.def > 0){
                                    this.levelUpBonus.draw(350, 295);
                                }
                                // Did we level up res?
                                if(this.units[this.activeUnit].levelUpBonuses.res > 0){
                                    this.levelUpBonus.draw(350, 340);
                                }

                            }
                        }
                    } else if (this.targetedUnit.unitType === 'player'){
                        // Display level up message
                        if(this.levelUpMessageTimer.delta() < 0){
                            this.levelUpMessage.draw(20, 200);
                            if(!this.playingLevelUpSFX){
                                this.playingLevelUpSFX = true;
                                this.sfx.play('level_up');
                            }
                        }
                        // Finished displaying level up message.
                        // Draw level up modal
                        if(this.levelUpMessageTimer.delta() > 0){
                            this.levelUpModalTimer.reset();
                            this.levelUpBonusTimer.reset();
                            if(this.levelUpModalTimer.delta() < 0){
                                this.levelUpModal.draw(20, 250);
                                this.levelUpTop.draw(20, 150);
                                // Draw unit name
                                this.font30.default.draw(this.targetedUnit.name, 40, 160);
                                // Draw unit level
                                this.font30.default.draw(this.targetedUnit.level - 1, 295, 160);
                                this.font30.green.draw('->', 315, 165);
                                this.font30.default.draw(this.targetedUnit.level, 340, 160);
                                this.levelUpBonus.draw(360, 140);
                                // Draw unit hp
                                this.font30.default.draw(this.targetedUnit.health_max, 120, 270);
                                // Draw unit str
                                this.font30.default.draw(this.targetedUnit.stat.str, 120, 315);
                                // Draw unit skl
                                this.font30.default.draw(this.targetedUnit.stat.skl, 120, 360);
                                // Draw unit spd
                                this.font30.default.draw(this.targetedUnit.stat.spd, 120, 405);
                                // Draw unit luk
                                this.font30.default.draw(this.targetedUnit.stat.luk, 320, 270);
                                // Draw unit def
                                this.font30.default.draw(this.targetedUnit.stat.def, 320, 315);
                                // Draw unit res
                                this.font30.default.draw(this.targetedUnit.stat.res, 320, 360);
                                // Draw unit con
                                this.font30.default.draw(this.targetedUnit.stat.wt, 320, 405);
                                // Draw unit mugshot
                                this.targetedUnit.mugshot.draw(440, 280);
                                // Did we level up hp?
                                if(this.targetedUnit.levelUpBonuses.hp > 0){
                                    this.levelUpBonus.draw(155, 250);
                                }
                                // Did we level up str?
                                if(this.targetedUnit.levelUpBonuses.str > 0){
                                    this.levelUpBonus.draw(155, 295);
                                }

                                if(this.targetedUnit.levelUpBonuses.skl > 0){
                                    this.levelUpBonus.draw(155, 340);
                                }

                                if(this.targetedUnit.levelUpBonuses.spd > 0){
                                    this.levelUpBonus.draw(155, 385);
                                    // Reset bonus counter
                                    //this.units[this.activeUnit].levelUpBonuses.skl = 0;
                                }

                                if(this.targetedUnit.levelUpBonuses.luk > 0){
                                    this.levelUpBonus.draw(350, 250);
                                }

                                if(this.targetedUnit.levelUpBonuses.def > 0){
                                    this.levelUpBonus.draw(350, 295);
                                }
                                if(this.targetedUnit.levelUpBonuses.res > 0){
                                    this.levelUpBonus.draw(350, 340);
                                }

                            }
                        }

                    }
                }

                else {
                    if(this.units[this.activeUnit].unitType === 'player'){
                        // Reset all bonuses in player
                        this.units[this.activeUnit].levelUpBonuses.hp = 0;
                        this.units[this.activeUnit].levelUpBonuses.str = 0;
                        this.units[this.activeUnit].levelUpBonuses.skl = 0;
                        this.units[this.activeUnit].levelUpBonuses.spd = 0;
                        this.units[this.activeUnit].levelUpBonuses.luk = 0;
                        this.units[this.activeUnit].levelUpBonuses.def = 0;
                        this.units[this.activeUnit].levelUpBonuses.res = 0;
                        this.units[this.activeUnit].leveledUp = false;
                        this.battleState =  null;
                        this.playingLevelUpSFX = false;
                        // If we need to discard an item due to full inventory...
                        if(this.item_drop !== null){
                            this.dropCheck();
                        } else {
                            // We have space for the item, end active units turn
                            this.units[this.activeUnit].turnUsed = true;
                        }
                    } else if (this.targetedUnit.unitType === 'player'){
                        // Reset all bonuses in player
                        this.targetedUnit.levelUpBonuses.hp = 0;
                        this.targetedUnit.levelUpBonuses.str = 0;
                        this.targetedUnit.levelUpBonuses.skl = 0;
                        this.targetedUnit.levelUpBonuses.spd = 0;
                        this.targetedUnit.levelUpBonuses.luk = 0;
                        this.targetedUnit.levelUpBonuses.def = 0;
                        this.targetedUnit.levelUpBonuses.res = 0;
                        this.targetedUnit.leveledUp = false;
                        this.playingLevelUpSFX = false;
                        this.battleState =  null;
                        // If we need to discard an item due to full inventory...
                        if(this.item_drop !== null){
                            this.dropCheck();
                        } else {
                            // We have space for the item, end active units turn
                            this.units[this.activeUnit].turnUsed = true;
                        }
                    }
                }

            }

            // Draw equipment bonuses/changes when equipping
            if((this.units[this.activeUnit].selectedWeapon !== null && this.units[this.activeUnit].isEquipping) || (this.item_drop !== null && this.units[this.activeUnit].unitType !== 'player' && this.targetedUnit.selectedWeapon !== null && this.targetedUnit.isEquipping)) {
                var u = this.units[this.activeUnit].unitType === 'player' ? this.units[this.activeUnit] : this.units[this.activeUnit].unitType === 'enemy' ? this.targetedUnit : null;
                if(typeof u !== null) {
                    this.weaponModal.draw(390, 350);

                    if(typeof u.statMugshot !== 'undefined') {
                        u.mugshot.draw(410, 150);
                    }

                    var atkChange = u.stat.str + u.selectedWeapon.atk;
                    var hitChange = u.stat.hit + u.selectedWeapon.hit;
                    var critChange = u.stat.crit + u.selectedWeapon.crit;
                    var evadeChange = u.mod.evade;

                    this.font20.black.draw('Affinity: ' + u.selectedWeapon.affinity, 510, 370, ig.Font.ALIGN.CENTER);

                    // Draw stats for new weapon
                    this.font20.black.draw('Atk:', 410, 403);
                    if(atkChange > u.derived_stats.atk) {
                        this.font16.green.draw(u.derived_stats.atk + '->' + atkChange, 450, 404);
                    } else if(atkChange < u.derived_stats.atk) {
                        this.font16.red.draw(u.derived_stats.atk + '->' + atkChange, 450, 404);
                    } else {
                        this.font16.default.draw(u.derived_stats.atk, 450, 404);
                    }

                    this.font20.black.draw('Hit:', 410, 437);
                    if(hitChange > u.derived_stats.hit_rate) {
                        this.font16.green.draw(u.derived_stats.hit_rate + '->' + hitChange, 450, 438);
                    } else if(hitChange < u.derived_stats.hit_rate) {
                        this.font16.red.draw(u.derived_stats.hit_rate + '->' + hitChange, 450, 438);
                    } else {
                        this.font16.default.draw(u.derived_stats.hit_rate, 450, 438);
                    }

                    this.font20.black.draw('Crit:', 530, 403);
                    if(critChange > u.derived_stats.crit_rate) {
                        this.font16.green.draw(u.derived_stats.crit_rate + '->' + critChange, 575, 404);
                    } else if(critChange < u.derived_stats.crit_rate) {
                        this.font16.red.draw(u.derived_stats.crit_rate + '->' + critChange, 575, 404);
                    } else {
                        this.font16.default.draw(u.derived_stats.crit_rate, 575, 404);
                    }

                    this.font20.black.draw('Avo:', 530, 437);
                    this.font16.default.draw(evadeChange, 575, 438);
                }
            }

            // Draw small character modal, showing small sprite, HP and level.
            // Spawn this whenever the cursor is hovering on top of an entity.
            // Currently, we'll only focus on player modals.
            if(this.units[this.activeUnit].unitType === 'player' && !this.menuVisible && this.battleState !== 'battle_start' && this.hoveredUnit !== null && (this.battleState !== 'trade' && this.battleState !== 'trading')) {
                // Draw small status screen modal
                this.hpModal.draw(10, 405);
                this.font16.black.draw(this.hoveredUnit.name, 120, 418, ig.Font.ALIGN.CENTER);
                this.font16.black.draw('HP: ' + this.hoveredUnit.health + '/' + this.hoveredUnit.health_max, 85, 440);

                // Draw small character modal sprite
                // Bypass drawing character modal sprite if one does not exist (usually for enemy units)
                if(typeof this.hoveredUnit.modal !== 'undefined') {
                    this.hoveredUnit.modal.draw(15, 408);
                }
            }

            // Draw battle objectives summary screen
            if(this.battleState === 'objective'){
                a = this.units[0];
                this.objectiveModal.draw(0,0);
                this.fontContent20.draw('Fire Emblem: Chronicles of the Abyss', 115, 35);
                this.font30.default.draw(ig.global.gold, 175, 390);
                this.font30.default.draw(this.turn_counter, 250, 340);
                a.statMugshot.draw(465, 205);
                this.font30.default.draw(a.level, 430, 305);
                this.font20.default.draw(a.health + '/' + a.health_max, 415, 350);
                this.font30.default.draw(ig.global.main_player_name, 375, 260);
                if(this.levels[this.director.currentLevel].description === 'Survive'){
                    this.fontContent20.draw('Survive for ' + this.levels[this.director.currentLevel].objectiveArgs + ' turns!', 90, 250);
                }
                if(this.levels[this.director.currentLevel].description === 'DefeatEnemies'){
                    this.fontContent20.draw('Defeat all enemies!', 90, 250);
                }
                if(this.levels[this.director.currentLevel].description === 'Seize'){
                    this.fontContent20.draw('Seize the boss tile!', 100, 250);
                }
                this.font30.default.draw(this.numPlayers, 415, 160);
                this.font30.default.draw(this.numEnemies, 540, 160);

                // Press enter to close the status screen.
                if(ig.input.state('escape')) {
                    this.battleState = null;
                }
            }

            // Player unit's stat screen menu
            if(this.battleState === 'stats') {
                this.statScreen.draw(0, 0);
                a = this.tempUnit;

                if(ig.input.pressed('down')) {
                    this.tempUnit = this.unitStats[(this.unitStats.indexOf(a) + 1) % this.unitStats.length];
                }

                if(ig.input.pressed('up')) {
                    if((this.unitStats.indexOf(a) - 1) % this.unitStats.length < 0){
                        this.tempUnit = this.unitStats[this.unitStats.length - 1];
                    } else {
                        this.tempUnit = this.unitStats[(this.unitStats.indexOf(a) - 1) % this.unitStats.length];
                    }
                }

                if(typeof a.statMugshot !== 'undefined') {
                    if(a.unitType === 'enemy') {
                        a.statMugshot.draw(23, 25);
                    } else {
                        a.statMugshot.draw(15, 25);
                    }
                }

                this.font20.default.draw(a.name,       250, 30);
                this.font20.default.draw(a.level,      255,  120);
                this.font20.default.draw(a.exp_curr,   305,  120);
                this.font20.default.draw(a.health,     255,  160);
                this.font20.default.draw(a.health_max, 295, 160);
                this.font20.default.draw(a.stat.str,   80,  240);
                // this.font20.default.draw(a.stat.mag,   350, 141);
                this.font20.default.draw(a.stat.def,   80, 395);
                this.font20.default.draw(a.stat.res,   80, 435);
                this.font20.default.draw(a.stat.spd,   80, 355);
                // luk is now equal to dodge. dodge is the chance of avoiding a critial hit.
                this.font20.default.draw(a.stat.luk,   480, 160);
                this.font20.default.draw(a.stat.mov,   240, 240);
                // Draw derived stats
                this.font20.default.draw(a.derived_stats.atk, 480, 80);
                this.font20.default.draw(a.derived_stats.hit_rate, 480, 120);
                this.font20.default.draw('1 ~ ' + a.atk_dist, 565, 40);
                this.font20.default.draw(a.derived_stats.crit_rate, 580, 80);
                this.font20.default.draw(a.derived_stats.evade, 580, 120);
                this.font20.default.draw(a.derived_stats.attack_speed, 580, 160);

                for(var i = 0; i < a.item.length; i++) {
                    if(a.item[i] !== null && typeof a.item[i] !== 'undefined') {
                        a.item[i].icon.draw(360, 250 + i * 40);
                        if(a.hasEquippedItem && i === 0) {
                            this.font20.default.draw('(E)' + a.item[i].name, 375, 250 + i * 40);
                        } else {
                            this.font20.default.draw(a.item[i].name, 400, 250 + i * 40);
                        }
                        this.font20.default.draw(a.item_uses[i] + '/' +  a.item[i].uses, 550, 250 + i * 40);
                    }
                }

                // Press enter to close the status screen.
                if(ig.input.state('escape')) {
                    this.battleState = null;
                }
            }

            // Draw the terrain modal
            if(this.units[this.activeUnit].unitType === 'player' && this.battleState !== 'battle_start' && this.hoveredTerrain !== null && this.battleState !== 'objective' && this.battleState !== 'stats' && !this.menuVisible && this.battleState !== 'trade' && this.battleState !== 'trading' && typeof this.hoveredTerrain !== 'undefined') {
                this.terrainModal.draw(475, 395);
                this.font16.black.draw(this.hoveredTerrain.type,  555, 420, ig.Font.ALIGN.CENTER);
                this.font16.black.draw(this.hoveredTerrain.def,   565, 440                      );
                this.font16.black.draw(this.hoveredTerrain.avoid, 565, 453                      );
            }

            // Draw battle summary modal on cursor hover while selecting an enemy to attack
            if(this.battleState === 'attack') {
                if(this.hoveredUnit !== null && this.attackTargets.length > 0) {
                    for(var i = 0; i < this.attackTargets.length; i++) {
                        if(this.hoveredUnit === this.attackTargets[i].unit) {
                            this.battleSummaryModal.draw(515, 5);
                            var activeUnit_terrain = ig.game.getTerrain(this.units[this.activeUnit].pos.x, this.units[this.activeUnit].pos.y);
                            var hoveredUnit_terrain = ig.game.getTerrain(this.hoveredUnit.pos.x, this.hoveredUnit.pos.y);
                            //if(this.units[this.activeUnit].item[0] !== null && this.units[this.activeUnit].item[0].type === 'equip') {
                                //this.units[this.activeUnit].item[0].icon.draw(                                                         520,  10                      );
                            //}
                            this.font16.default.draw(this.units[this.activeUnit].name,                                                 587,  20, ig.Font.ALIGN.CENTER);
                            this.font16.default.draw(this.units[this.activeUnit].health,                                               600,  52                      );
                            this.font16.default.draw(this.computeBattleNormalDamage(this.units[this.activeUnit], this.hoveredUnit) - hoveredUnit_terrain.def,    600,  85                      );
                            this.font16.default.draw(this.computeBattleNormalHitChance(this.units[this.activeUnit], this.hoveredUnit) + this.weaponTriangle(this.units[this.activeUnit], this.hoveredUnit) - hoveredUnit_terrain.avoid < 0 ?
                                0 : this.computeBattleNormalHitChance(this.units[this.activeUnit], this.hoveredUnit) + this.weaponTriangle(this.units[this.activeUnit], this.hoveredUnit) - hoveredUnit_terrain.avoid > 100 ? 100: this.computeBattleNormalHitChance(this.units[this.activeUnit], this.hoveredUnit) + this.weaponTriangle(this.units[this.activeUnit], this.hoveredUnit) - hoveredUnit_terrain.avoid,
                                                                                                                                       600, 118                      );
                            this.font16.default.draw(this.computeBattleCritChance(this.units[this.activeUnit], this.hoveredUnit),      600, 149                      );

                            this.font16.default.draw(this.hoveredUnit.health,                                                          549,  52, ig.Font.ALIGN.RIGHT );
                            this.font16.default.draw(this.computeBattleNormalDamage(this.hoveredUnit, this.units[this.activeUnit]) - activeUnit_terrain.def,    549,  85, ig.Font.ALIGN.RIGHT );
                            this.font16.default.draw(this.computeBattleNormalHitChance(this.hoveredUnit, this.units[this.activeUnit]) + this.weaponTriangle(this.hoveredUnit, this.units[this.activeUnit]) - activeUnit_terrain.avoid < 0 ?
                                0 : this.computeBattleNormalHitChance(this.hoveredUnit, this.units[this.activeUnit]) + this.weaponTriangle(this.hoveredUnit, this.units[this.activeUnit]) - activeUnit_terrain.avoid > 100 ? 100 : this.computeBattleNormalHitChance(this.hoveredUnit, this.units[this.activeUnit]) + this.weaponTriangle(this.hoveredUnit, this.units[this.activeUnit]) - activeUnit_terrain.avoid,
                                                                                                                                       549, 118, ig.Font.ALIGN.RIGHT );
                            this.font16.default.draw(this.computeBattleCritChance(this.hoveredUnit, this.units[this.activeUnit]),      549, 149, ig.Font.ALIGN.RIGHT );
                            this.font16.default.draw(this.hoveredUnit.name,                                                            570, 183, ig.Font.ALIGN.CENTER);
                            if(this.hoveredUnit.item[0] !== null && this.hoveredUnit.item[0].type === 'equip') {
                                //this.hoveredUnit.item[0].icon.draw(                                                                    598, 173                      );
                                this.font16.default.draw(this.hoveredUnit.item[0].name,                                                565, 213, ig.Font.ALIGN.CENTER);
                            }

                            break;
                        }
                    }
                }
            }

            // Battle animation overlay
            if((this.battleState === 'battle_start' || this.battleState === 'battle_transitionOut') && this.units[this.activeUnit] !== this.targetedUnit) {
                a = this.battleAnimStats.activeUnit;
                t = this.battleAnimStats.targetedUnit;

                var a_overlayDetailPos, t_overlayDetailPos;

                if(this.units[this.activeUnit].unitType === 'player' && this.targetedUnit.unitType === 'enemy') {
                    a_overlayDetailPos = [
                        {x: ig.system.width - 20,     y: 25,  align: ig.Font.ALIGN.RIGHT}, // Unit name
                        {x: ig.system.width - 5,      y: 337, align: ig.Font.ALIGN.RIGHT}, // Unit stat: HIT
                        {x: ig.system.width - 5,      y: 362, align: ig.Font.ALIGN.RIGHT}, // Unit stat: DMG
                        {x: ig.system.width - 5,      y: 387, align: ig.Font.ALIGN.RIGHT}, // Unit stat: CRT
                        {x: ig.system.width / 2 + 25, y: 372                            }, // Weapon image
                        {x: ig.system.width / 2 + 70, y: 382, align: ig.Font.ALIGN.LEFT }, // Weapon name
                        {x: ig.system.width / 2 + 65, y: 437, align: ig.Font.ALIGN.RIGHT}, // Unit numeric health
                        {x: ig.system.width / 2 + 74, y: 440, width: 200 * ig.system.scale, height: 14 * ig.system.scale} // Health bar
                    ];

                    t_overlayDetailPos = [
                        {x: 5,  y: 25,  align: ig.Font.ALIGN.LEFT }, // Unit name
                        {x: 100, y: 337, align: ig.Font.ALIGN.RIGHT}, // Unit stat: HIT
                        {x: 100, y: 362, align: ig.Font.ALIGN.RIGHT}, // Unit stat: DMG
                        {x: 100, y: 387, align: ig.Font.ALIGN.RIGHT}, // Unit stat: CRT
                        {x: 130, y: 372                            }, // Weapon image
                        {x: 170, y: 382, align: ig.Font.ALIGN.LEFT }, // Weapon name
                        {x: 65,  y: 437, align: ig.Font.ALIGN.RIGHT}, // Unit numeric health
                        {x: 74,  y: 440, width: 200 * ig.system.scale, height: 14 * ig.system.scale} // Health bar
                    ];
                } else if(this.units[this.activeUnit].unitType === 'enemy' && this.targetedUnit.unitType === 'player') {
                    a_overlayDetailPos = [
                        {x: 5,  y: 25,  align: ig.Font.ALIGN.LEFT }, // Unit name
                        {x: 100, y: 337, align: ig.Font.ALIGN.RIGHT}, // Unit stat: HIT
                        {x: 100, y: 362, align: ig.Font.ALIGN.RIGHT}, // Unit stat: DMG
                        {x: 100, y: 387, align: ig.Font.ALIGN.RIGHT}, // Unit stat: CRT
                        {x: 130, y: 372                            }, // Weapon image
                        {x: 170, y: 382, align: ig.Font.ALIGN.LEFT }, // Weapon name
                        {x: 65,  y: 437, align: ig.Font.ALIGN.RIGHT}, // Unit numeric health
                        {x: 74,  y: 440, width: 200 * ig.system.scale, height: 14 * ig.system.scale} // Health bar
                    ];

                    t_overlayDetailPos = [
                        {x: ig.system.width - 20,     y: 25,  align: ig.Font.ALIGN.RIGHT}, // Unit name
                        {x: ig.system.width - 5,      y: 337, align: ig.Font.ALIGN.RIGHT}, // Unit stat: HIT
                        {x: ig.system.width - 5,      y: 362, align: ig.Font.ALIGN.RIGHT}, // Unit stat: DMG
                        {x: ig.system.width - 5,      y: 387, align: ig.Font.ALIGN.RIGHT}, // Unit stat: CRT
                        {x: ig.system.width / 2 + 25, y: 372                            }, // Weapon image
                        {x: ig.system.width / 2 + 70, y: 382, align: ig.Font.ALIGN.LEFT }, // Weapon name
                        {x: ig.system.width / 2 + 65, y: 437, align: ig.Font.ALIGN.RIGHT}, // Unit numeric health
                        {x: ig.system.width / 2 + 74, y: 440, width: 200 * ig.system.scale, height: 14 * ig.system.scale} // Health bar
                    ];
                }

                // Active unit -------------------------------------------------
                this.font20.default.draw(a.name,                               a_overlayDetailPos[0].x, a_overlayDetailPos[0].y, a_overlayDetailPos[0].align);
                this.font20.default.draw(this.computeBattleNormalHitChance(a, t) + this.weaponTriangle(a, t) < 0 ? 0 : this.computeBattleNormalHitChance(a, t) + this.weaponTriangle(a, t) > 100 ? 100 : this.computeBattleNormalHitChance(a, t) + this.weaponTriangle(a, t),
                                                                               a_overlayDetailPos[1].x, a_overlayDetailPos[1].y, a_overlayDetailPos[1].align);
                this.font20.default.draw(this.computeBattleNormalDamage(a, t), a_overlayDetailPos[2].x, a_overlayDetailPos[2].y, a_overlayDetailPos[2].align);
                this.font20.default.draw(this.computeBattleCritChance(a, t),   a_overlayDetailPos[3].x, a_overlayDetailPos[3].y, a_overlayDetailPos[3].align);
                if(a.item[0] !== null && a.item[0].type === 'equip') {
                    a.item[0].icon.draw(                                       a_overlayDetailPos[4].x, a_overlayDetailPos[4].y                             );
                    this.font20.default.draw(a.item[0].name,                   a_overlayDetailPos[5].x, a_overlayDetailPos[5].y, a_overlayDetailPos[5].align);
                } else {
                    this.font20.default.draw('----',                           a_overlayDetailPos[5].x, a_overlayDetailPos[5].y, a_overlayDetailPos[5].align);
                }
                this.font20.default.draw(a.health,                             a_overlayDetailPos[6].x, a_overlayDetailPos[6].y, a_overlayDetailPos[6].align);

                // Health border/background
                ig.system.context.fillStyle = 'rgb(0, 0, 0)';
                ig.system.context.beginPath();
                    ig.system.context.rect(
                        a_overlayDetailPos[7].x,
                        a_overlayDetailPos[7].y,
                        a_overlayDetailPos[7].width,
                        a_overlayDetailPos[7].height
                    );
                ig.system.context.closePath();
                ig.system.context.fill();

                // Health bar
                ig.system.context.fillStyle = 'rgb(75, 255, 75)';
                ig.system.context.beginPath();
                    ig.system.context.rect(
                        a_overlayDetailPos[7].x + 1,
                        a_overlayDetailPos[7].y + 1,
                        a_overlayDetailPos[7].width * (a.health / a.health_max) - 2,
                        a_overlayDetailPos[7].height - 2
                    );
                ig.system.context.closePath();
                ig.system.context.fill();

                // Target unit -------------------------------------------------
                this.font20.default.draw(t.name,                               t_overlayDetailPos[0].x, t_overlayDetailPos[0].y, t_overlayDetailPos[0].align);
                this.font20.default.draw(this.computeBattleNormalHitChance(t, a) + this.weaponTriangle(t, a) < 0 ? 0 : this.computeBattleNormalHitChance(t, a) + this.weaponTriangle(t, a) > 100 ? 100 : this.computeBattleNormalHitChance(t, a) + this.weaponTriangle(t, a),
                                                                               t_overlayDetailPos[1].x, t_overlayDetailPos[1].y, t_overlayDetailPos[1].align);
                this.font20.default.draw(this.computeBattleNormalDamage(t, a), t_overlayDetailPos[2].x, t_overlayDetailPos[2].y, t_overlayDetailPos[2].align);
                this.font20.default.draw(this.computeBattleCritChance(t, a),   t_overlayDetailPos[3].x, t_overlayDetailPos[3].y, t_overlayDetailPos[3].align);
                if(t.item[0] !== null && t.item[0].type === 'equip') {
                    t.item[0].icon.draw(                                       t_overlayDetailPos[4].x, t_overlayDetailPos[4].y                             );
                    this.font20.default.draw(t.item[0].name,                   t_overlayDetailPos[5].x, t_overlayDetailPos[5].y, t_overlayDetailPos[5].align);
                } else {
                    this.font20.default.draw('----',                           t_overlayDetailPos[5].x, t_overlayDetailPos[5].y, t_overlayDetailPos[5].align);
                }
                this.font20.default.draw(t.health,                             t_overlayDetailPos[6].x, t_overlayDetailPos[6].y, t_overlayDetailPos[6].align);

                // Health border/background
                ig.system.context.fillStyle = 'rgb(0, 0, 0)';
                ig.system.context.beginPath();
                    ig.system.context.rect(
                        t_overlayDetailPos[7].x,
                        t_overlayDetailPos[7].y,
                        t_overlayDetailPos[7].width,
                        t_overlayDetailPos[7].height
                    );
                ig.system.context.closePath();
                ig.system.context.fill();

                // Health bar
                ig.system.context.fillStyle = 'rgb(75, 255, 75)';
                ig.system.context.beginPath();
                    ig.system.context.rect(
                        t_overlayDetailPos[7].x + 1,
                        t_overlayDetailPos[7].y + 1,
                        t_overlayDetailPos[7].width * (t.health / t.health_max) - 2,
                        t_overlayDetailPos[7].height - 2
                    );
                ig.system.context.closePath();
                ig.system.context.fill();
            }

            // Screen fade transition effect
            if(this.screenFadeOut) {
                this.screenFadeOut.draw();
            }
            if(this.screenFadeIn) {
                this.screenFadeIn.draw();
            }
            if(this.screenFadeInToBattleAnim) {
                this.screenFadeInToBattleAnim.draw();
            }
            if(this.screenFadeInFromBattleAnim) {
                this.screenFadeInFromBattleAnim.draw();
            }
            if(this.screenFadeOutAfterEffect) {
                this.screenFadeOutAfterEffect.draw();
            }
        } // End draw method
    }); // End ig.BattleMode

    /**
     *  ig.GameSettings
     *  -----
     *  Displays the game configuration settings and options.
     */
    ig.GameSettings = ig.BaseGame.extend({
        stop: false,

        init: function(x, y, settings) {
            this.parent(x, y, settings);

            //this.screenFadeOut = new ig.ScreenFader({
            //    fade: 'out',
            //    speed: 1
            //});

            // Spawn configuration buttons
            this.spawnEntity(ig.global.EntityButton_settings_vol_down, 360, 112.5, { type: 'bgm' });
            this.spawnEntity(ig.global.EntityButton_settings_vol_up, 480, 112.5, { type: 'bgm' });
            this.spawnEntity(ig.global.EntityButton_settings_vol_down, 360, 152.5, { type: 'sfx' });
            this.spawnEntity(ig.global.EntityButton_settings_vol_up, 480, 152.5, { type: 'sfx' });
            this.spawnEntity(ig.global.EntityButton_settings_return, ig.system.width / 2 - 100, 400);
        },

        update: function() {
            this.parent();

            //if(ig.input.pressed('leftClick') && !this.stop) {
            //    this.fadeIn();
            //    this.stop = true;
            //}
        }, // End update method

        draw: function() {
            this.parent();

            //ig.system.context.fillStyle = 'rgb(0, 0, 0)';
            //ig.system.context.beginPath();
            //    ig.system.context.rect(this.screen.x, this.screen.y, this.screen.x, this.screen.y);
            //ig.system.context.closePath();
            //ig.system.context.fill();

            // Draw labels and current setting
            this.font20.default.draw('Game Settings', ig.system.width / 2, 40, ig.Font.ALIGN.CENTER);
            this.font20.default.draw('BGM Volume:  ' + Math.round(ig.music.volume * 100), 60, 120);
            this.font20.default.draw('SFX Volume:  ' + Math.round(this.sfx.volume * 100), 60, 160);

            // Screen fade transition effect
            //if(this.screenFadeOut)
            //    this.screenFadeOut.draw();
            //if(this.screenFadeIn)
            //    this.screenFadeIn.draw();
        } // End draw method

        //fadeIn: function() {
        //    this.screenFadeIn = new ig.ScreenFader({
        //        fade: 'in',
        //        speed: 1.5,
        //        callback: function() { ig.system.setGame(ig.BattleMode); },
        //        delayBefore: 1,
        //        delayAfter: 1
        //    });
        //}
    }); // End ig.StartScreen

    /**
    *   ig.CutScene
    *   ----
    *       - Displays the cutscene within the game.
    *       - Plays cutscene before and after each level.
    */
    ig.CutScene = ig.BaseGame.extend({
        dialogBox : new ig.Image('media/gui/text_box.png'),
        townBackground: new ig.Image('media/backgrounds/town.png'),

        // Set up dialog catalog
        dialogCatalog: new ig.global.Dialog_Catalog(),
        sequence: 'prebattle',
        dialog_index: 0,

        init: function() {
            this.parent();

            this.sequence = ig.global.objective_triggered === true ? 'postbattle' : 'prebattle';
        },

        update: function() {
            this.parent();

            if(ig.input.pressed('leftClick')) {
                if(this.dialog_index < this.dialogCatalog[ig.global.currentLevel][this.sequence].dialog.length - 1) {
                    this.dialog_index++;
                } else {
                    this.fadeIn();
                }
            }
        },

        draw: function() {
            this.parent();

            // Draw the background
            this.dialogCatalog[ig.global.currentLevel][this.sequence].background.draw(0, 0);

            // Draw the dialog box
            this.dialogBox.draw(0, 360);

            // Draw the speakers
            this.dialogCatalog[ig.global.currentLevel][this.sequence].speaker1.draw(400, 160);
            this.dialogCatalog[ig.global.currentLevel][this.sequence].speaker2.draw(40, 160);

            if(this.dialog_index < this.dialogCatalog[ig.global.currentLevel][this.sequence].dialog.length) {
                this.font20.default.draw(this.dialogCatalog[ig.global.currentLevel][this.sequence].dialog[this.dialog_index], 0, 360);
            }

            if(this.screenFadeIn) {
                this.screenFadeIn.draw();
            }
        },

        fadeIn: function() {
            this.screenFadeIn = new ig.ScreenFader({
                fade: 'in',
                speed: 1.5,
                callback: function() {
                    if(ig.global.objective_triggered === true) {
                        ig.global.currentLevel++;
                        ig.global.objective_triggered = false;

                        if(ig.global.currentLevel < Object.keys(this.dialogCatalog).length) {
                            ig.system.setGame(ig.CutScene);
                        } else {
                            ig.system.setGame(ig.GameCredits);
                        }
                    } else {
                        ig.system.setGame(ig.BattleMode);
                    }
                },
                delayBefore: 1,
                delayAfter: 1
            });
        }
    });

    /**
     *  ig.StartScreen
     *  -----
     *  Displays the game start screen (seen immediately after the game loads).
     */
    ig.StartScreen = ig.BaseGame.extend({
        stop: false,

        storage: new ig.Storage(),

        init: function(x, y, settings) {
            this.parent(x, y, settings);

            // Spawn background image
            this.spawnEntity(ig.global.EntityOverlay_startscreen, 0, 0);

            var i = 0;

            // Begin start menu buttons ----------------------------------------
            // Display continue button if game data was previously saved and exists in local storage
            //if(this.storage.isSet('units') && this.storage.isSet('activeUnit')) {
            //    this.spawnEntity(ig.global.EntityButton_startscreen_continue, 480, 280 + i++ * 40);
            //}

            this.spawnEntity(ig.global.EntityButton_startscreen_newgame, 480, 280 + i++ * 40);
            this.spawnEntity(ig.global.EntityButton_startscreen_settings, 480, 280 + i++ * 40);
            this.spawnEntity(ig.global.EntityButton_startscreen_credits, 480, 280 + i++ * 40); // TODO
            // End start menu buttons ------------------------------------------

            this.screenFadeOut = new ig.ScreenFader({
                fade: 'out',
                speed: 1
            });
        },

        draw: function() {
            this.parent();

            // Fallback: black screen if background image does not load
            ig.system.context.fillStyle = 'rgb(0, 0, 0)';
            ig.system.context.beginPath();
                ig.system.context.rect(this.screen.x, this.screen.y, this.screen.x, this.screen.y);
            ig.system.context.closePath();
            ig.system.context.fill();

            // Screen fade transition effect
            if(this.screenFadeOut) {
                this.screenFadeOut.draw();
            }
            if(this.screenFadeIn) {
                this.screenFadeIn.draw();
            }
        }, // End draw method

        fadeIn: function() {
            this.screenFadeIn = new ig.ScreenFader({
                fade: 'in',
                speed: 1.5,
                callback: function() { ig.system.setGame(ig.CutScene); },
                delayBefore: 1,
                delayAfter: 1
            });
        }
    }); // End ig.StartScreen

    /**
     *  ig.GameOver
     *  -----
     *  Displays the game over screen when the main player has been defeated or
     *  has failed the primary battle objective.
     */
    ig.GameOver = ig.BaseGame.extend({
        background: new ig.Image('media/gameover.png'),

        displayExtra: false,

        init: function(x, y, settings) {
            this.parent(x, y, settings);

            ig.music.fadeOut(5);

            this.screenFadeOut = new ig.ScreenFader({
                fade: 'out',
                callback: function() { this.displayExtra = true; },
                speed: 0.5,
                delayAfter: 1
            });
        },

        update: function() {
            this.parent();

            if(this.displayExtra && (ig.input.pressed('leftClick') || ig.input.pressed('rightClick'))) {
                ig.system.setGame(ig.StartScreen);
            }
        }, // End update method

        draw: function() {
            this.parent();

            this.background.draw(0, 0);

            // Fallback: black screen if background image does not load
            //ig.system.context.fillStyle = 'rgb(0, 0, 0)';
            //ig.system.context.beginPath();
            //    ig.system.context.rect(this.screen.x, this.screen.y, this.screen.x, this.screen.y);
            //ig.system.context.closePath();
            //ig.system.context.fill();

            if(this.displayExtra) {
                this.font16.default.draw('Click to return to start screen', ig.system.width / 2, 440, ig.Font.ALIGN.CENTER);
            }

            // Screen fade transition effect
            if(this.screenFadeOut) {
                this.screenFadeOut.draw();
            }
        } // End draw method
    }); // End ig.GameOver

    /**
     *  ig.GameCredits
     *  -----
     *  Displays the credits screen upon game completion or when the player
     *  clicks on the "Credits" button in the start screen.
     */
    ig.GameCredits = ig.BaseGame.extend({
        credits_roll: null,
        scroll_speed: 42,

        end_timer: null,
        fade_duration: 10,

        dialogCatalog: new ig.global.Dialog_Catalog(),
        maxLevels: 0,

        init: function(x, y, settings) {
            this.parent(x, y, settings);

            ig.music.play('credits');

            this.end_timer = new ig.Timer();

            this.credits_roll = this.spawnEntity( ig.global.EntityCredits_roll, 0, ig.system.height + this.scroll_speed * 2, {
                vel: { x: 0, y: -this.scroll_speed }
            });

            this.maxLevels = Object.keys(this.dialogCatalog).length;
        },

        update: function() {
            this.parent();

            // If credits reached the end or if player interaction took place during credits
            if(this.credits_roll !== null && this.credits_roll.maxY >= 0 && this.credits_roll.pos.y <= -this.credits_roll.maxY) {
                if(this.credits_roll.pos.y < this.credits_roll.maxY && this.credits_roll.vel.y !== 0) {
                    this.credits_roll.vel.y = 0;

                    // If player did not finish the game
                    if(ig.global.currentLevel < this.maxLevels) {
                        // Fade out faster
                        this.end_timer.set(this.fade_duration / 2);
                        ig.music.fadeOut(this.fade_duration / 2);
                        this.fadeIn(2);
                    }
                    // Player finished the game
                    else {
                        // Show all credits and fade slower
                        this.end_timer.set(this.fade_duration);
                        ig.music.fadeOut(this.fade_duration);
                        this.fadeIn();
                    }
                }
            } else if((ig.input.pressed('leftClick') || ig.input.pressed('rightClick')) && ig.global.currentLevel < this.maxLevels) {
                // Allow early credit end and fade out faster
                this.end_timer.set(this.fade_duration / 2);
                ig.music.fadeOut(this.fade_duration / 2);
                this.fadeIn(2);
            }
        }, // End update method

        draw: function() {
            this.parent();

            // Fallback: black screen if background image does not load
            //ig.system.context.fillStyle = 'rgb(0, 0, 0)';
            //ig.system.context.beginPath();
            //    ig.system.context.rect(this.screen.x, this.screen.y, this.screen.x, this.screen.y);
            //ig.system.context.closePath();
            //ig.system.context.fill();

            // Screen fade transition effect
            if(this.screenFadeIn) {
                this.screenFadeIn.draw();
            }
        }, // End draw method

        fadeIn: function(t) {
            t = t || 1;

            this.screenFadeIn = new ig.ScreenFader({
                fade: 'in',
                speed: 0.55 * Math.pow(t, 1.6),
                callback: function() { ig.system.setGame(ig.StartScreen); },
                delayBefore: 6 / Math.pow(t, 2),
                delayAfter: 2 / t
            });
        }
    }); // End ig.GameCredits

    // IMPACTJS ENGINE EXTENSION FUNCTIONS
    // ig.Music extensions --------------------
    /**
     *  undefined fadeOutAndPause(number time)
     *  -----
     *  Linearly fade out the current track over time seconds. When the fade out
     *  is complete, .pause() is called and the volume for this track is reset
     *  to it's original volume.
     */
    ig.Music.prototype.fadeOutAndPause = function(time) {
        if(!this.currentTrack) {
            return;
        }

        clearInterval(this._fadeInterval);
        this.fadeTimer = new ig.Timer(time);
        this._fadeInterval = setInterval(this._fadeStepAndPause.bind(this), 50);
    };

    ig.Music.prototype._fadeStepAndPause = function() {
        var v = this.fadeTimer.delta().map(-this.fadeTimer.target, 0, 1, 0).limit(0, 1) * this._volume;

        if(v <= 0.01) {
            this.pause();
            this.currentTrack.volume = this._volume;
            clearInterval(this._fadeInterval);
        } else {
            this.currentTrack.volume = v;
        }
    };

    // Override ig.Music._endedCallback to disable music looping or advancing to next track
    ig.Music.prototype._endedCallback = function() {};
    // End ig.Music extensions --------------------

    // IMPACTJS DEBUG SETTINGS OVERRIDE (for testing purposes only)
    //ig.Entity._debugShowBoxes = true;
    //ig.Entity._debugShowVelocities = true;
    //ig.Entity._debugShowNames = true;

    // Display game screen
    // Draw to HTML tag with id='canvas' and start game in ig.MainGame state with
    //   60 FPS, 640x480 resolution, and 1x scale ratio.
    ig.main('#canvas', ig.StartScreen, 60, 640, 480, 1);
}); // End .defines


//##############################################################################
//# Global functions                                                           #
//##############################################################################
/**
 *  object ig.global.alignToGrid(number pos_x, number pos_y)
 *  -----
 *  Aligns the provided coordinates to the nearest grid tile. Used to reposition
 *  entities back to grid in case they get knocked off alignment.
 *
 *  Precondition:
 *      pos_x: The current x-coordinate of the object.
 *      pos_y: The current y-coordinate of the object.
 *
 *  Postcondition:
 *      Returns an object of 2 properties {x: pos_x_aligned, y: pos_y_aligned},
 *      where pos_x_aligned and pos_y_aligned represents the aligned coordinates,
 *      respectively. If the entity or object uses the coordinates provided in
 *      the return value, it should align itself to the map rounded to the
 *      nearest multiple of ig.global.tilesize.
 *
 *  Example:
 *      // main.js
 *      ig.global.tilesize = 32;
 *
 *      // myEntity.js
 *      this.pos = {x: 36.59, y: 74.02}
 *      this.pos = ig.global.alignToGrid(this.pos.x, this.pos.y);
 *      console.log(this.pos); // {x: 32, y: 64}
 */
ig.global.alignToGrid = function(pos_x, pos_y) {
    return {
        x: Math.floor(pos_x / ig.global.tilesize) * ig.global.tilesize,
        y: Math.floor(pos_y / ig.global.tilesize) * ig.global.tilesize
    };
};

/**
 *  undefined ig.global.killAllButtons(object btn)
 *  -----
 *  Custom kill() method to selectively delete all entities of object btn.
 */
ig.global.killAllButtons = function(btn) {
    var btns = ig.game.getEntitiesByType(btn);
    for(var b = 0; b < btns.length; b++) {
        btns[b].kill();
    }
};
