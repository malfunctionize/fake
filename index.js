module.exports = {
  "run": [
    {
      "method": "person",
      "returns": "person"
    },
    {
      "method": "let",
      "params": {
        "prompt": "We have a {{person.sex}} named {{person.firstName}} {{person.lastName}}, who resides in {{person.city}} {{person.state}}, born in {{person.dateOfBirth}}, works in the {{person.department}} department of the company {{person.company}}. Take a photo of this person. Just describe what this person looks like and what they are doing, in detail."
      }
    },
    {
      "method": "llm",
      "params": {
        "path": "{{config.llama.path}}",
        "message": {
          "_": [ "./main" ],
          "m": "{{config.llama.model}}",
          "p": "### Instruction\n\n{{prompt}}\n\n### Response"
        }
      },
      "returns": "description"
    },
    {
      "method": "fetch",
      "params": {
        "url": "{{config.automatic1111.url}}",
        "method": "post",
        "headers": { "content-type": "application/json" },
        "body": {
          "cfg_scale": "{{config.automatic1111.cfg_scale}}",
          "override_settings": {
            "sd_model_checkpoint": "{{random config.automatic1111.models}}"
          },
          "steps": "{{config.automatic1111.steps}}",
          "prompt": "{{description}}"
        },
        "response": "json"
      },
      "returns": "automatic1111"
    },
    {
      "method": "buffer",
      "params": {
        "from": "base64",
        "to": "buffer",
        "data": "{{automatic1111.images[0]}}"
      },
      "returns": "buf"
    },
    {
      "method": "fetch",
      "params": {
        "url": "{{config.blog.url}}",
        "method": "post",
        "body": {
          "image": "{{buf}}",
          "text": "{{description}}"
        }
      },
      "response": "json"
    }
  ]
}
