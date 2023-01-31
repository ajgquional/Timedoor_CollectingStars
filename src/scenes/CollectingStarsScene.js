import Phaser from 'phaser'

// global variables for objects created in the game
var platforms;
var player;
var cursors;
var stars;
var score = 0;
var scoreText;
var bombs;

export default class CollectingStarsScene extends Phaser.Scene
{
	constructor()
	{
		super('collecting-stars-scene')
	}

	preload()
	{
		// loading the game assets
        this.load.image("ground", "images/platform.png");
        this.load.image("sky", "images/sky.png");
        this.load.image("star", "images/star.png");
		this.load.image("bomb", "images/bomb.png");
		// when spritesheet is being loaded, take note of the width and height of the individual frames 
        this.load.spritesheet("dude", "images/dude.png",{
            frameWidth: 32, frameHeight:48
        });

    }

    create()
    {
		// =============== OBJECT CREATION ===============
		// creating the background
		this.add.image(400, 300, "sky");

		// creating the platforms group
		platforms = this.physics.add.staticGroup();

		// creating three platforms which belong to the "platforms" group
		// additional platforms (in different locations within the game screen) can be created 
		platforms.create(600, 400, "ground");
		platforms.create(50, 250, "ground");
		platforms.create(750, 220, "ground");

		// creating a one long ground platform
		platforms.create(400, 568, "ground").setScale(2).refreshBody();

		// creating the player
		player = this.physics.add.sprite(100, 450, "dude");
		player.setCollideWorldBounds(true);
		player.setBounce(0.2);

		// creating the player animation
		// walk left animation:
		this.anims.create({
			key: "left", // animation name
			frames: this.anims.generateFrameNumbers("dude", {
				start: 0,
				end: 3,
			}), // frames used
			frameRate: 10, // in fps
			repeat: -1,	// number of times to repeat the animation; default value is 0 and -1 for looped animation
		});

		// front-facing animation:
		this.anims.create({
			key: "turn",
			frames: [{ key: "dude", frame: 4 }], // only one frame is to be used
			frameRate: 20,
		});

		// walk right animation:
		this.anims.create({
			key: "right",
			frames: this.anims.generateFrameNumbers("dude", {
				start: 5,
				end: 8,
			}),
			frameRate: 10,
			repeat: -1,
		});

		// creating a keyboard object
		cursors = this.input.keyboard.createCursorKeys();

		// creating a stars group
		stars = this.physics.add.group({
			key: "star", // game object name (from the preload method)
			repeat: 11, // loop 11 times (or, a star would be created 11 times)
			// the position of the first star, and the distance from the next star
			setXY: { x: 12, y: 0, stepX: 70 },
		});

		// loop on all stars, create a bouncing effect on each star with value between 0.4 to 0.8
		stars.children.iterate(function (child) {
			child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
		});

		// creating a score text object
		scoreText = this.add.text(16, 16, "Score : 0", {
			fontSize: "32px",
			fill: "yellow",
		});

		// creating a bombs group (the actual bombs would be created when a star is collected)
		bombs = this.physics.add.group();

		// =============== COLLISIONS AND OVERLAPS ===============
		this.physics.add.collider(player, platforms); // collision between the player and any of the platforms
		this.physics.add.collider(stars, platforms); // collision between the stars and the platforms
		this.physics.add.collider(bombs, platforms); // collision between the bombs and the platforms

		// creating an overlap between player and the stars, facilitating the collection of the star
		this.physics.add.overlap(
			player, 
			stars, 
			this.collectStar, // collectStar method is called when the player and star overlaps
			null, // unneeded callback process
			this // ensure overlap in this scene
		);

		// creating a collision between the player and the bombs
		this.physics.add.collider(
			player,
			bombs,
			this.hitBomb, // hitBomb method will be called once the player collided with a bomb
			null,
			this
		);
	}

    // collectStar method is called when the player and star overlaps
	// takes the player and star as parameters
    collectStar(player, star)
    {
		star.disableBody(true, true); // removes the physical star
		score += 10; // increments the score, 1 star is worth 10
		scoreText.setText("Score : " + score); // displays the text with the latest score

		// whenever the player collects a star, a bomb would appear from the top
		// random x position of the bomb computed based on player's position
		// conditional operator reference: condition ? value-if-true : value-if-false
		var x =
			player.x < 400
				? Phaser.Math.Between(400, 800)
				: Phaser.Math.Between(0, 400);

		// a bomb would be created with x-coordinate given above and 0 y-coordinate (meaning, from the top)
		var bomb = bombs.create(x, 0, "bomb");
		bomb.setBounce(1); // add bounce effect to the bomb
		bomb.setCollideWorldBounds(true); // bomb would bounce when it hits the edge of the game world
		bomb.setVelocity(Phaser.Math.Between(-200, 200), 20); // random x and y velocity of the bomb

		// CHALLENGE: Stars would appear again once they are all collected
		if (stars.countActive(true) === 0) {
			// if count on the stars is 0, enable and show all of them once again
			star.enableBody(
				true,
				x,
				0,
				true,
				true
			);
		}
	}

	// hitBomb method is called when the player and bomb collides
	// takes the player and bomb as parameters per the book, but bomb can be removed
    hitBomb(player)
    {
        this.physics.pause(); // pausing the game, effectively disabling it
        player.setTint(0xff0000); // making the player red in color when the bomb hit it
        player.anims.play("turn"); // turn animation for the player would be played
    }

    update()
    {
        // keyboard controls
		// it will always be checked if player is pressing the left, right, or up arrow keys
        // if left arrow key is pressed
        if (cursors.left.isDown) {
			player.setVelocityX(-160); // player walks left because value is negative
			player.anims.play("left", true); // left animation is played
		}

		// if right arrow key is pressed
		else if (cursors.right.isDown) {
			player.setVelocityX(160); // player walks right because value is positive
			player.anims.play("right", true); // right animation is played
		}
		
		// if neither left or right arrow is pressed, player character would stop and default animation turn is played
		else {
			player.setVelocityX(0); // player stops
			player.anims.play("turn"); // turn animation is played
		}

		// if up arrow key is pressed
        if (cursors.up.isDown ){
            player.setVelocityY(-250); // player jumps/moves up and speeds up
        }
    }
}