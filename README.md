# Vue Lambda

## Installation

1.  Install [git](https://git-scm.com "Git")

    - Recommended installation notes:
      - Linux: install via a native package management tool, e.g. [apt](https://help.ubuntu.com/lts/serverguide/apt.html.en "Advanced Packaging Tool")
      - MacOS: install via [Xcode](https://developer.apple.com/xcode/ "Xcode") command line tools (`$ xcode-select --install`) or install [Xcode](https://developer.apple.com/xcode/ "Xcode") (via the [Mac App Store](https://developer.apple.com/app-store/mac/ "Mac App Store"))
      - Windows: install via a [Bash](https://www.gnu.org/software/bash/ "Bash")-like environment, e.g. [Git for Windows](https://gitforwindows.org "Git for Windows")
    - Confirm installation via the following command: `$ git --version`

2.  Install [Docker](https://docs.docker.com/install/ "Docker Installation Guide")

3.  [Create a global .gitignore](https://help.github.com/articles/ignoring-files/#create-a-global-gitignore "How to create a global .gitignore")

    - Note: It is bad practice to include operating system and IDE lines in a project's .gitignore _unless they are required by the project_. This project does not require a specific operating system nor IDE so ensure your global .gitignore includes lines for all files relevant to your [operating system(s) and IDE(s)](https://github.com/github/gitignore "GitHub example .gitignore files")

4.  Clone the repository

```bash
$ git clone git@github.com:ModusCreateOrg/vue-lambda.git
```

5. Change your current directory to the local clone of the repository

```bash
$ cd vue-lambda
```

6. Build the Docker image (see below)
7. Install dependencies (see below)
8. Deploy Support CloudFormation Stack (see below)
9. (If forked: ) Integrate [Travis](https://travis-ci.org/ "Travis") with repository to build automagically Branch CloudFormation Stack
   - You must add the following environment variables to the [Travis](https://travis-ci.org/ "Travis") build configuration:
     - AWS_DEFAULT_REGION
     - AWS_ACCESS_KEY_ID
     - AWS_SECRET_ACCESS_KEY
10. If you're testing with Lighthouse, do it on the fallback route: `/pwa`

## Getting Started

### Build the Docker image

- Build the [Docker](https://www.docker.com/ "Docker") image

```bash
$ docker build -t vue-lambda .
```

### Run a command on the Docker image

- Run commands via the [Docker](https://www.docker.com/ "Docker") image

```bash
$ docker run --mount src="$(pwd)",target=/opt/vue-lambda,type=bind vue-lambda COMMAND
```

#### Install dependencies

- Install [npm](https://www.npmjs.com "Npm") dependencies

- Note: `unsafe-perm` is used so that iltorb can successfully install a pre-compiled binary for compression (rather than building one during `install`)

```bash
$ docker run --mount src="$(pwd)",target=/opt/vue-lambda,type=bind vue-lambda npm install --unsafe-perm
```

#### Start

- Start the development server. You can access the website at: `http://localhost`

```bash
$ docker run --mount src="$(pwd)",target=/opt/vue-lambda,type=bind -p 80:80 vue-lambda
```

#### Lint

- Lint files using [ESLint](https://eslint.org "ESLint"), [stylelint](https://stylelint.io "Stylelint") and [Prettier](https://prettier.io "Prettier")

  - Note: It is strongly recommended to incorporate [ESLint](https://eslint.org "ESLint"), [stylelint](https://stylelint.io "Stylelint"), [Prettier](https://prettier.io "Prettier") and [EditorConfig](https://editorconfig.org "EditorConfig") into your IDE's syntax checking, highlighting and `on save` event

- Check for errors via:

```bash
$ docker run --mount src="$(pwd)",target=/opt/vue-lambda,type=bind vue-lambda npm run lint
```

- Automagically fix any automagically-fixable errors via:

```bash
$ docker run --mount src="$(pwd)",target=/opt/vue-lambda,type=bind vue-lambda npm run lint-fix
```

- Check if any configuration rules conflict with [Prettier](https://prettier.io "Prettier") via:

```bash
$ docker run --mount src="$(pwd)",target=/opt/vue-lambda,type=bind vue-lambda npm run lint-check-rules
```

#### Test

- Test files via unit and snapshot test using [Jest](https://jestjs.io/ "Jest")

```bash
$ docker run --mount src="$(pwd)",target=/opt/vue-lambda,type=bind vue-lambda npm run test:unit
```

#### Interactive

- Run [Docker](https://www.docker.com/ "Docker") in interactive mode

```bash
$ docker run --mount src="$(pwd)",target=/opt/vue-lambda,type=bind -it vue-lambda /bin/bash
```

## DevOps

### Deploy Support CloudFormation Stack

- Deploy the support [CloudFormation](https://aws.amazon.com/cloudformation/ "CloudFormation") stack

  - Note: AWS CLI configuration files must exist on your host machine at `~/.aws`
  - Note: You must use unique values for `<S3_BUCKET_NAME_ARTIFACTS>` and `<S3_BUCKET_NAME_STATIC>`

```bash
$ docker run --mount src="$(pwd)",target=/opt/vue-lambda,type=bind --mount src="$(cd ~/.aws && pwd)",target=/root/.aws,type=bind -e STACK_NAME="vue-lambda-support" -e S3_BUCKET_NAME_ARTIFACTS="<S3_BUCKET_NAME_ARTIFACTS>" -e S3_BUCKET_NAME_STATIC="<S3_BUCKET_NAME_STATIC>" vue-lambda bash ./bin/deploy-support.sh
```
