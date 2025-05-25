# Extwee Config File Options

The configuration file supports some, but not all, possible actions using command-line arguments.

## Defining `mode`

The most important option is `mode`. This **MUST BE** either `compile` or `decompile`.

```json
{
    "mode": "decompile"
}
```

## Defining `input` and `output`

To process files, the `input` and `output` properties **MUST BE** defined using either an absolute or relative path.

```json
{
    "mode": "compile",
    "input": "index.twee",
    "output": "index.html"
}
```

## Defining `story-format`

If using the `"mode": "compile"` option, the `story-format` property **MUST BE** defined. This should be the name of a directory in the relative `./story-formats` directory.

For example, if using Harlowe, the path would be `./story-formats/harlowe` and the key-value pair would be `"story-format": "harlowe"`.

```json
{
    "mode": "compile",
    "input": "index.twee",
    "output": "index.html",
    "story-format": "harlowe"
}
```

### Defining optional `story-format-version`

The Story Format Archive retains story formats based on its version. This can be specified, such as `3.2.0`, or the default `latest` can be used.

```json
{
    "mode": "compile",
    "input": "index.twee",
    "output": "index.html",
    "story-format": "harlowe",
    "story-format-version": "3.2.0"
}
```
