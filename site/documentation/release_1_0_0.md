# Changelog for RingoJS 1.0.0

Release date: 14 December 2016

Ringo's first major release!

## Features & Breaking Changes

* Updates to Rhino 1.7.7.1, fixes #337 - [commit](https://github.com/ringo/ringojs/commit/8569f4e585e57729d98b7f93afc99a0e3e13a2e3)
* New objects.clone(); ports the node-clone package to Ringo (#345) - [commit](https://github.com/ringo/ringojs/commit/3d377a39824e73e1c1503693aa5917f22de7aae5)
* Improved string and dates util modules (#343) - [commit](https://github.com/ringo/ringojs/commit/4108e33580cc0abff637d028a0caeb9720fae00a)
    * Adds custom date format to dates.parse()
    * Adds toggle for lenient date parsing
    * Adds strings.isDate() check
    * Removed unnecessary import of binary module
* Allow HTTP middlewares to preserve & modify input stream (#351) - [commit](https://github.com/ringo/ringojs/commit/0e8c281886b02ea93304c1e359422a6904b71676)
* `ringo -version` displays patch version number - [commit](https://github.com/ringo/ringojs/commit/14c222e1123158eee617ce9b6a9dc7b38c8a82a2)

## Bugfixes

* Fixed response.stream(); adds response.binary() for binary HTTP responses - [commit](https://github.com/ringo/ringojs/commit/573ce292dc24c641dc42c8cc89db88d4043fc1e2)
* Stricter check for multipart form request data - [commit](https://github.com/ringo/ringojs/commit/36f3bcbb16b52fd5f3c85a817840d21fe181c2e6)
* Adds content type parameter for BinaryPart in `multipart/form-data` requests - [commit](https://github.com/ringo/ringojs/commit/7c3ba5461639b4e5b126507c6f37127c7f7a4e89)
* Switched to ringo/mime instead of Java's `guessContentTypeFromName()` in the HTTP client - [commit](https://github.com/ringo/ringojs/commit/b0309f96d81380918c9bd9ecc19e42a001d21cd4)
* Accept `Content-Encoding` values case-insensitive (#354) - [commit](https://github.com/ringo/ringojs/commit/0ffad94ec66ab9c5565d120e252ac9a241804689)
* Fixes ringo-admin - [commit](https://github.com/ringo/ringojs/commit/1210e5c5a7d3930af69136e477b275638a5230b3)
* Adds `<async-supported>` to `web.xml` - [commit](https://github.com/ringo/ringojs/commit/7f6a35c0883e966b8671f98aae43b30ddad5a668)
* Fixed behaviour of `http.setCookie()` for negative numbers - [commit](https://github.com/ringo/ringojs/commit/b98de8fff3f6be6b3627d8cffb7fae8430aa8a82)

## Contributors

### For this release

* Robert Gaggl
* Philipp Naderer
* Simon Oberhammer

### Until now

* Hannes Wallnöfer (over 2,000 commits)
* Philipp Naderer (336 commits)
* Andreas Bolka (120 commits)
* Simon Oberhammer (96 commits)
* Robert Thurnher (64 commits)
* Robert Gaggl (59 commits)
* Tim Schaub (39 commits)
* Richard R. McKinley (4 commits)
* Jim Cook (4 commits)
* Manfred Andres (3 commits)
* Christian Langreiter (3 commits)
* Matthias Platzer (3 commits)
* George Moschovitis (3 commits)
* Garry Yao
* Bill Lee
* Samuli Tuomola
* SC Lee
* Siarhei Nekhviadovich
* Peter Newhook
* Oleg Podsechin
* Maksim Lin
* Kwang Yul Seo
* Jan-Felix Wittmann
* James Cook
* Fabien Meghazi
* Don Brown
