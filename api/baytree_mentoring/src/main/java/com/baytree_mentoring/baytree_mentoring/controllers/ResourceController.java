package com.baytree_mentoring.baytree_mentoring.controllers;

import com.baytree_mentoring.baytree_mentoring.exceptions.FailedResourceAddingException;
import com.baytree_mentoring.baytree_mentoring.models.Authentication;
import com.baytree_mentoring.baytree_mentoring.models.Resource;
import com.baytree_mentoring.baytree_mentoring.services.ResourceService;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class ResourceController {

    private static final String SUCCESS = "Resource Added";
    private static final String deleteSUCCESS = "Resource deleted";
    private final ResourceService resourceService;

    public ResourceController(ResourceService resourceService) {
        this.resourceService = resourceService;
    }

    @ResponseStatus(HttpStatus.CREATED)
    @PostMapping("/resource/add")
    @CrossOrigin(origins = "http://localhost:3000")
    private String AddResource(@RequestBody Resource res){
        Resource resource = new Resource(res.getResourceId(), res.getResourceName(), res.getResourceLink());

        resourceService.AddResourceService(resource);

        List<Resource> resources = resourceService.getAllResources();

        for(Resource s : resources) {
            if(s.getResourceId() == resource.getResourceId()) {
                return SUCCESS;
            }
        }

        String error = "Failed to add the Resource.";
        throw new FailedResourceAddingException(error);
    }

    @ResponseStatus(HttpStatus.OK)
    @GetMapping("/resource/get/all")
    @CrossOrigin(origins = "http://localhost:3000")
    private List<Resource> getAllResources() {
        return resourceService.getAllResources();
    }

    @ResponseStatus(HttpStatus.OK)
    @DeleteMapping("/resource/delete/{resourceId}")
    @CrossOrigin(origins = "http://localhost:3000")
    private List<Resource> deleteResource(@PathVariable("resourceId") Long resId){

        List<Resource> resources = resourceService.getAllResources();

        for(Resource s : resources) {
            if(s.getResourceId() == resId) {
                resourceService.deleteResourceUsingId(resId);
                return resourceService.getAllResources();
            }
        }

        String error = "Failed to Delete the Resource.";
        throw new FailedResourceAddingException(error);
    }
}
