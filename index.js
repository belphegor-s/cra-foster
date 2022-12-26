const path = require("path");
const fs = require("fs");
const process = require("process");
const { cwd } = require("process");
const { execSync } = require("child_process");
const readline = require("readline").createInterface({
	input: process.stdin,
	output: process.stdout,
});
const fse = require("fs-extra");

const projectInit = () => {
	const projectPath = path.join(__dirname, `${projectName}`);
	fs.mkdirSync(projectPath);
	console.log(`✅ Project Directory (${projectName}) created- `, cwd());

	try {
		fse.copySync(path.join(__dirname, "template"), projectPath, {
			overwrite: true,
		});
		console.log("✅ Template added");
	} catch (err) {
		console.error(err);
	}

	process.chdir(projectPath);

	try {
		const stdout = execSync("npm init -y");
		console.log("✅ " + "package.json file created");
	} catch (err) {
		console.error("❌" + err.message);
	}

	try {
		console.log("Adding React and React DOM...");
		const stdout = execSync("npm i react react-dom --save");
		console.log("✅ " + stdout);
	} catch (err) {
		console.error("❌" + err.message);
	}

	try {
		console.log("Adding Webpack and devDependencies...");
		const stdout = execSync(
			"npm i webpack webpack-cli webpack-dev-server html-webpack-plugin css-loader style-loader copy-webpack-plugin --save-dev"
		);
		console.log("✅ " + stdout);
	} catch (err) {
		console.error("❌" + err.message);
	}

	try {
		console.log("Adding Babel to Webpack...");
		const stdout = execSync(
			"npm i @babel/core @babel/plugin-transform-runtime @babel/preset-env @babel/preset-react babel-loader --save-dev"
		);
		console.log("✅ " + stdout);
	} catch (err) {
		console.error("❌" + err.message);
	}

	const data = fs.readFileSync(path.join(projectPath, "package.json"));
	const text = JSON.parse(data);

	text.main = "/src/index.js";
	text.scripts = {
		start: "webpack-dev-server .",
		build: "webpack .",
	};

	fs.writeFileSync(
		path.join(projectPath, "package.json"),
		JSON.stringify(text, null, 4)
	);

	console.log("✅ Project Created");
	console.log("Start By-");
	console.log("");
	console.log("\x1b[36m%s\x1b[0m", `    cd ${projectName}`);
	console.log("\x1b[36m%s\x1b[0m", `    npm start`);
	console.log("");
	console.log("\x1b[33m%s\x1b[0m", "Happy Hacking");

	process.exit(0);
};

// Reading Project Name
let projectName = process.argv[2];

if (!projectName) {
	readline.question("Enter Project Name -> ", (name) => {
		readline.close();
		projectName = name;
		projectInit();
	});
} else {
	projectInit();
}
