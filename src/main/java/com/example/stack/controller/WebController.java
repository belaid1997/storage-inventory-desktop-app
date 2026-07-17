package com.example.stack.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class WebController {

    // Matches any path that does not contain a period (like .js, .css, .png) and isn't an API path
    @RequestMapping(value = { "{path:[^\\.]*}", "/**/{path:[^\\.]*}" })
    public String redirect() {
        // Forward to the React entry point
        return "forward:/index.html";
    }
}