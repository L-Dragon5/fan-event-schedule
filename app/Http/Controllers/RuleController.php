<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Validator;
use App\Rule;

class RuleController extends Controller
{
    private $successStatus = 200;
    private $errorStatus = 422;

    /**
     * Retrieve all rules.
     * 
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function index() {
        $rules = Rule::all()->sortBy('title');

        return $rules;
    }

    /**
     * Store rule in DB.
     * 
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request) {
        $validator = Validator::make($request->all(), [
            'title' => 'string|required',
            'description' => 'string|nullable'
        ]);

        if($validator->fails()) {
            return return_json_message($validator->errors(), $this->errorStatus);
        }

        $rule = new Rule;
        $rule->title = $request->title;
        $rule->description = $request->description;
        $success = $rule->save();

        if ($success) {
            return return_json_message('Created new rule succesfully', $this->successStatus);
        } else {
            return return_json_message('Something went wrong while trying to create a new rule', 401);
        }
    }

    /**
     * Update the rule content.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $validator = Validator::make($request->all(), [
            'title' => 'string|required',
            'description' => 'string|nullable'
        ]);

        if($validator->fails()) {
            return return_json_message($validator->errors(), $this->errorStatus);
        }

        try {
            $rule = Rule::findOrFail($id);
            $rule->title = $request->title;
            $rule->description = $request->description;
            $success = $rule->save();

            if ($success) {
                return return_json_message('Updated succesfully', $this->successStatus);
            } else {
                return return_json_message('Something went wrong while trying to update', 401);
            }
        } catch (\Illuminate\Database\Eloquent\ModelNotFoundException $e) {
            return return_json_message('Invalid rule id', 401);
        }
    }

    /**
     * Remove rule by id.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(Request $request, $id) {
        $success = Rule::destroy($id);

        if ($success) {
            return return_json_message('Deleted succesfully', $this->successStatus);
        } else {
            return return_json_message('Did not find a rule to remove', 401);
        }
    }
}
