const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const path = require("path");

module.exports = {
	entry: path.join(__dirname, "src", "index.js"),
	output: {
		path: path.join(__dirname, "build"),
		filename: "index.bundle.js",
	},
	mode: "development",
	devServer: {
		port: 5000,
		static: {
			directory: path.join(__dirname, "public/static"),
		},
		historyApiFallback: true,
		open: true,
		hot: true,
		liveReload: true,
	},
	resolve: {
		extensions: [".js", ".jsx", ".json"],
	},
	module: {
		rules: [
			{
				test: /\.(js|jsx)$/,
				exclude: /node_modules/,
				use: {
					loader: "babel-loader",
					options: {
						presets: ["@babel/preset-react", "@babel/preset-env"],
						plugins: ["@babel/plugin-transform-runtime"],
					},
				},
			},
			{
				test: /\.css$/,
				exclude: /node_modules/,
				use: ["style-loader", "css-loader"],
			},
			{
				test: /\.(woff(2)?|eot|ttf|otf|svg|)$/,
				type: "asset",
				parser: {
					dataUrlCondition: {
						maxSize: 8 * 1024,
					},
				},
				generator: {
					filename: "static/fonts/[name]-[hash][ext][query]",
				},
			},
			{
				test: /\.(?:ico|gif|png|jpg|jpeg|svg)$/i,
				type: "asset/resource",
				generator: {
					filename: "static/images/[name]-[hash][ext][query]",
				},
			},
		],
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: "public/index.html",
		}),
		new CopyWebpackPlugin({
			patterns: [{ from: "public/static", to: "static" }],
		}),
	],
};
