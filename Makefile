REPORTER=spec

test: node_modules
	@node test/index.js

node_modules: package.json
	@npm install
	@npm dedupe
	@touch node_modules

.PHONY: test